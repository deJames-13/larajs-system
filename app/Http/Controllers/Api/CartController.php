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

            return ProductResource::collection($products);
        }

        return response(null, 401, ['message' => 'Unauthorized']);
    }

    public function show(string $id)
    {
        return redirect()->route('products.show', $id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|numeric',
            'quantity' => 'required|numeric',
        ]);
        $customer = $request->user();

        // if the product is already in the cart, add the quantity
        if ($customer->products->contains($data['product_id'])) {
            $newQuantity = $customer->products->find($data['product_id'])->pivot->quantity + $data['quantity'];
            $customer->products()->updateExistingPivot($data['product_id'], ['quantity' => $newQuantity]);

            // NOTE: ALWAYS RETURN cONTENT U FxK
            return response($data, 201, ['message' => 'Item updated in cart successfully']);
        }


        $customer->products()->attach($data['product_id'], ['quantity' => $data['quantity']]);
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
        return response(null, 204, ['message' => 'Item removed from cart successfully']);
    }
}
