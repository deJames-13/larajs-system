<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use Barryvdh\Debugbar\Facades\Debugbar;

class CartController extends Controller
{
    public function index()
    {
        if (auth()->user()) {
            $products = auth()->user()->products;
            $products->load(['images']);
            return ProductResource::collection($products);
        }

        return response(null, 401, ['message' => 'Unauthorized']);
    }

    public function show(string $id)
    {
        return redirect()->route('products.show', $id);
    }

    private function updateOrAttachProduct($customer, $productId, $quantity)
    {
        if ($customer->products->contains($productId)) {
            $newQuantity = $customer->products->find($productId)->pivot->quantity + $quantity;
            return $customer->products()->updateExistingPivot($productId, ['quantity' => $newQuantity]);
        } else {
            return $customer->products()->attach($productId, ['quantity' => $quantity]);
        }
    }
    public function store(Request $request)
    {
        $isBuyAgain = request('buy_again') ?? false;

        if (!$isBuyAgain) {
            $data = $request->validate([
                'quantity' => 'required|numeric',
                'product_id' => 'required|numeric',
            ]);
        } else {
            $data = $request->validate([
                'products' => 'required|array',
                'products.*.product_id' => 'required|numeric',
                'products.*.quantity' => 'required|numeric',
            ]);
        }

        $customer = $request->user();
        if (isset($data['products'])) {
            foreach ($data['products'] as $product) {
                $this->updateOrAttachProduct($customer, $product['product_id'], $product['quantity']);
            }
            return response($data, 201, ['message' => 'Items added to cart successfully']);
        }

        $this->updateOrAttachProduct($customer, $data['product_id'], $data['quantity']);
        return response($data, 201, ['message' => 'Item added to cart successfully']);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'products' => 'required',
        ]);
        $customer = $request->user();
        $customer->products()->detach();

        foreach ($data['products'] as $product) {
            $customer->products()->attach($product['id'], ['quantity' => $product['quantity']]);
        }

        // Debugbar::info($customer->products);
        return response(ProductResource::collection($customer->products), 200, ['message' => 'Carts updated successfully']);
    }
    public function destroy(string $id)
    {
        $customer = request()->user();
        $customer->products()->detach($id);
        // Debugbar::info($customer->products);
        $res = ProductResource::collection($customer->products);
        return response($res, 200, ['message' => 'Item removed from cart successfully']);
    }
}
