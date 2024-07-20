<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Mail\OrderStatusNotifier;
use App\Models\Order;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    // INFO: For user api fetch
    public function index(Request $request)
    {
        $status = $request->query('status') ?? 'all';
        $page = $request->query('page') ?? 1;
        $limit = $request->query('limit') ?? 10;
        $isAdmin = $request->user()->role === 'admin';

        $orders = Order::query();
        if ($status !== 'all') {
            $orders->where('status', $status);
        }

        if ($isAdmin)
            $orders->with('customer.info');
        else
            $orders->where('user_id', $request->user()->id);
        $orders->with([
            'products' => function ($query) {
                $query->withPivot('quantity');
            },
            'customer',
        ]);


        $orders->orderBy('updated_at', 'desc');

        $page = $orders->paginate($limit);

        // Debugbar::info($page);

        return OrderResource::collection($page);
    }

    // INFO: For admin api fetch
    public function show(string $id)
    {
        $order = Order::with([
            'products' => function ($query) {
                $query->withPivot('quantity');
            },
            'customer', 'customer.info',
        ])->findOrFail($id);
        if (!$order) {
            return response(
                [],
                404,
                [
                    'message' => 'Order not found',
                ]
            );
        }

        // Debugbar::info($order);
        return new OrderResource($order);
    }

    // INFO: Order Processing
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'shipping_address' => 'required|array',
                'shipping_address.*' => 'required|string',
                'products' => 'required|array',
                'products.*.id' => 'required|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
                'customer_info' => 'sometimes',
            ]
        );

        // Debugbar::info($request);

        $combinedAddress = collect($data['shipping_address'])->values()->implode(', ');

        $user = $request->user();
        $order = $user->orders()->create([
            'shipping_address' => $combinedAddress,
            'status' => 'pending',
        ]);

        $order->products()->attach(
            collect($data['products'])->mapWithKeys(
                function ($product) {
                    return [$product['id'] => ['quantity' => $product['quantity']]];
                }
            )
        );

        $order->load(['products', 'customer']);
        $res = (new OrderResource($order));

        // remove cart base on user id
        $user->products()->detach();

        // Debugbar::info($res);
        return response(
            $res,
            201,
            [
                'message' => 'Order has been placed successfully',
            ]
        );
    }

    // INFO: Order Update
    public function update(Request $request, string $id)
    {

        $data = $request->validate(
            [
                'status' => 'required|in:pending,processing,shipping,completed,cancelled',
                // if user wants to edit the pending
                'shipping_address' => 'sometimes',
                'products' => 'sometimes|array',
                'products.*.id' => 'sometimes|exists:products,id',
                'products.*.quantity' => 'sometimes|integer|min:1',
            ]
        );

        $isAdmin = $request->user()->role === 'admin';
        $isRequestCancel = $data['status'] === 'cancelled';

        if (!$isAdmin && !$isRequestCancel) {
            abort(403, 'You are not allowed to perform this action');
        }

        // Debugbar::info($data);
        $order = Order::findOrFail($id);

        // WARNING: ??
        if (isset($data['products'])) {
            $order->products()->sync(
                collect($data['products'])->mapWithKeys(
                    function ($product) {
                        return [$product['id'] => ['quantity' => $product['quantity']]];
                    }
                )
            );
        }
        // if ($data['status'] === 'cancelled') {
        //     // $order->products()->detach();
        // }

        if ($data['status'] === 'completed') {
            // update stocks of each products in order
            $order->products->each(
                function ($product) {
                    $product->stock->quantity -= $product->pivot->quantity;
                    $product->stock->save();
                }
            );
        }

        $order->update(
            [
                'status' => $data['status'],
                'shipping_address' => $data['shipping_address'] ?? $order->shipping_address,
                'updated_at' => now(),
                'paid_date' => $data['status'] === 'completed' ? now() : null,

            ]
        );

        // Refresh the model to ensure it has the latest data
        $order->refresh();
        $order->load(['products', 'customer']);
        $res = new OrderResource($order);

        Debugbar::info('Sending: ' . $order->customer->email);
        Mail::to($order->customer->email)->send(new OrderStatusNotifier($order));

        return $res;
    }

    // WARNING: Order Deletion is not recommended
    public function delete(Request $request, Order $order)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'You are not allowed to perform this action');
        }
        $order->delete();
    }

    public function restore(Request $request, Order $order)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'You are not allowed to perform this action');
        }
        $order->restore();
    }

    public function metadata()
    {
        $response  = Order::metadata();
        Debugbar::info($response);
        return response()->json($response);
    }
}
