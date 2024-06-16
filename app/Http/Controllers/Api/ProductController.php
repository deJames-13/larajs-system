<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function search()
    {
        // TODO: Implement sorting and other filters
        $product = Product::filter(request(['search']))->get();
        return ProductResource::collection($product);
    }
    public function index()
    {
        return ProductResource::collection(Product::all());
    }
    public function show(string $id)
    {
        $res = new ProductResource(Product::where('id', $id)->first());
        return $res;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'sku_code' => 'required|string|unique:products,sku_code',
            'stock' => 'required|numeric',
            'description' => 'required|string',
            'specifications' => 'required|string',
            'price' => 'required|numeric',
        ]);
        $stock = $data['stock'];
        unset($data['stock']);
        $product = Product::create($data);
        $product->stock()->create(['quantity' => $stock]);

        $res = new ProductResource($product);
        return response($res, 201, ['message' => 'Product added successfully!']);
    }
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'sku_code' => 'sometimes|string|exists:products,sku_code',
            'stock' => 'sometimes|numeric',
            'description' => 'sometimes|string',
            'specifications' => 'sometimes|string',
            'price' => 'sometimes|numeric',
        ]);

        $product = Product::where('id', $id)->first();
        if (!$product) return response(null, 404, ['message' => 'Product not found!']);


        if (isset($data['stock'])) {
            $product->stock()->update(['quantity' => $data['stock']]);
            unset($data['stock']);
        }

        $product->update($data);
        $res = new ProductResource($product);
        // Debugbar::info($res);
        return response($res, 200, ['message' => 'Product updated successfully!']);
    }
    public function delete(Request $request, string $id)
    {
        $product = Product::where('id', $id)->first();
        if (!$product) return response(null, 404, ['message' => 'Product not found!']);

        // softDeletes
        $product->delete();
        return response(null, 204, ['message' => 'Product deleted successfully!']);
    }
    public function restore(Request $request, string $id)
    {
        $product = Product::withTrashed()->where('id', $id)->first();
        if (!$product) return response(null, 404, ['message' => 'Product not found!']);

        $product->restore();
        return response(null, 200, ['message' => 'Product restored successfully!']);
    }
}
