<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Rating;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        return $this->getResources(Product::class, ProductResource::class, [
            'brands',
            'categories',
            'promos'
        ]);
    }

    public function show(string $id)
    {
        try {
            return $this->getResource($id, Product::class, ProductResource::class, [
                'brands',
                'categories',
                'promos'
            ]);
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 404);
        }
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
            'status' => 'required|string|in:active,inactive',
            'stock' => 'required|numeric',
            'brands' => 'sometimes|array',
            'brands.*' => 'sometimes|numeric',
            'categories' => 'sometimes|array',
            'categories.*' => 'sometimes|numeric',
        ]);
        Debugbar::info($data);

        $stock = $data['stock'] ?? null;
        $image_id = $data['image_id'] ?? null;
        $product = Product::create($data);

        $product->stock()->create(['quantity' => $stock ? $stock : 0]);
        $product->categories()->attach($data['categories'] ?? []);
        $product->brands()->attach($data['brands'] ?? []);
        $product->load([
            'brands',
            'categories',
            'promos'
        ]);

        $this->handleImageUpload($request, $product, $image_id);

        $res = new ProductResource($product);

        return response($res, 201, ['message' => 'Product added successfully!']);
    }

    public function update(Request $request, string $id)
    {
        Debugbar::info($request);
        $data = $request->validate([
            'name' => 'sometimes|string',
            'sku_code' => 'sometimes|string|unique:products,sku_code,' . $id . ',id',
            'stock' => 'sometimes|numeric',
            'description' => 'sometimes|string',
            'specifications' => 'sometimes|string',
            'status' => 'required|string|in:active,inactive',
            'price' => 'sometimes|numeric',
            'image_id' => 'sometimes|numeric',
            'brands' => 'sometimes|array',
            'brands.*' => 'sometimes|numeric',
            'categories' => 'sometimes|array',
            'categories.*' => 'sometimes|numeric',
        ]);

        $stock = $data['stock'] ?? null;
        unset($data['stock']);
        $image_id = $data['image_id'] ?? null;
        unset($data['image_id']);

        $product = Product::where('id', $id)->first();
        if (!$product) {
            return response(null, 404, ['message' => 'Product not found!']);
        }
        if ($stock) {
            $product->stock()->update(
                ['quantity' => $stock]
            );
        }

        $product->update($data);
        $product->categories()->sync($data['categories'] ?? []);
        $product->brands()->sync($data['brands'] ?? []);

        $product->load([
            'brands',
            'categories',
            'promos'
        ]);

        $this->handleImageUpload($request, $product, $image_id);

        $res = new ProductResource($product);

        // Debugbar::info($res);
        return response($res, 200, ['message' => 'Product updated successfully!']);
    }

    public function destroy(string $id)
    {
        $product = Product::where('id', $id)->first();
        if (!$product) {
            return response(null, 404, ['message' => 'Product not found!']);
        }

        // also delete the images
        $product->images()->delete();

        // softDeletes
        $product->delete();

        return response(null, 204, ['message' => 'Product deleted successfully!']);
    }

    public function restore(string $id)
    {
        $product = Product::withTrashed()->where('id', $id)->first();
        if (!$product) {
            return response(null, 404, ['message' => 'Product not found!']);
        }

        $product->restore();

        return response([], 200, ['message' => 'Product restored successfully!']);
    }

    public function thrashed()
    {
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 20;
        $order = request('order') ?? 'desc';
        $search = request(['search']) ?? null;

        $products = Product::onlyTrashed()
            ->filter($search)
            ->with([
                'brands',
                'categories',
                'promos'
            ])
            ->orderBy('updated_at', $order)
            ->paginate($limit, ['*'], 'page', $page);

        return ProductResource::collection($products);
    }

    public function status(Request $request, string $id)
    {
        $this->handleStatus($request, Product::class, $id);
    }

    public function ratings(string $id)
    {
        $page = request('page') ?? 1;
        $query = Rating::query();
        $query->when($id, function ($query, $id) {
            $query->whereHas('order', function ($query) use ($id) {
                $query->whereHas('products', function ($query) use ($id) {
                    $query->where('products.id', $id);
                });
            });
        });
        $c = clone $query;
        $meta = [
            'tabs' => [

                // ['label' => 'With Images', 'value' => $c->whereHas('images')->count()],
                ['label' => 'With Reviews', 'value' => $c->whereNotNull('review')->count()],
            ],
            'count' => $c->count(),
            'average' => $c->avg('rating'),
            'lowest' => $c->min('rating'),
            'highest' => $c->max('rating'),
        ];
        for ($i = 1; $i <= 5; $i++)
            $meta['tabs'][] = ['label' => $i . ' Star', 'value' => $c->where('rating', $i)->count()];
        $meta['tabs'][] = ['label' => 'All', 'value' => $meta['count']];

        $ratings = $query->paginate(10, ['*'], 'page', $page);
        $ratings->getCollection()->transform(function ($rating) {
            $rating->username = $rating->order->customer->username;
            $user_images = $rating->order->customer->images;
            $rating->user_image = $user_images->count() ? $user_images[0]->path : "https://placehold.co/400?text=" . $rating->username[0];
            $rating->user_id = $rating->order->customer->id;
            if (!$rating->isShowUser) {
                $rating->username = 'Anonymous';
                $rating->user_image = "https://placehold.co/400?text=anon";
            };

            $rating->makeHidden(['order']);
            return $rating;
        });

        $res = collect($meta)->merge(['ratings' => $ratings]);
        return response($res, 200);
    }
}
