<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use Barryvdh\Debugbar\Facades\Debugbar;

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
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 20;
        $order =    request('order') ?? 'desc';
        $search = request(['search']) ?? null;


        $products = Product::filter($search)
            ->with([
                // 'images',
                'brands',
                // 'categories',
            ])
            ->orderBy('updated_at', $order)
            ->paginate($limit, ['*'], 'page', $page);


        return ProductResource::collection($products);
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
            'description' => 'required|string',
            'specifications' => 'required|string',
            'price' => 'required|numeric',
            'image_id' => 'sometimes|numeric',
            'stock' => 'required|numeric',
            'brands' => 'sometimes|array',
            'brands.*' => 'sometimes|numeric',
            'categories' => 'sometimes|array',
            'categories.*' => 'sometimes|numeric',
        ]);
        // Debugbar::info($data);

        $stock = $data['stock'] ?? null;
        $image_id = $data['image_id'] ?? null;
        $product = Product::create($data);

        if ($stock) $product->stock()->create(['quantity' => $stock]);
        $this->handleImageUpload($request, $product, $image_id);


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
            'image_id' => 'sometimes|numeric'
        ]);
        // Debugbar::info($request);

        $stock = $data['stock'] ?? null;
        $image_id = $data['image_id'] ?? null;
        unset($data['stock']);
        unset($data['image_id']);

        $product = Product::where('id', $id)->first();
        if (!$product) return response(null, 404, ['message' => 'Product not found!']);
        if ($stock) $product->stock()->update(['quantity' => $stock]);


        $product->update($data);

        $this->handleImageUpload($request, $product, $image_id);

        $res = new ProductResource($product);


        // Debugbar::info($res);
        return response($res, 200, ['message' => 'Product updated successfully!']);
    }
    public function destroy(Request $request, string $id)
    {
        $product = Product::where('id', $id)->first();
        if (!$product) return response(null, 404, ['message' => 'Product not found!']);

        // also delete the images
        $product->images()->delete();

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


    public function attachBrand()
    {
    }

    public function attachCategory()
    {
    }
}
