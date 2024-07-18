<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    public function search()
    {
        $category = Category::filter(request(['search']))->get();
        return CategoryResource::collection($category);
    }


    public function index()
    {
        try {
            return $this->getResources(Category::class, CategoryResource::class);
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 404);
        }
    }

    public function show(string $id)
    {
        try {
            return $this->getResource($id, Category::class, CategoryResource::class);
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 404);
        }
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
            'description' => 'required|string',
            // enum of active and inactive
            'status' => 'required|string|in:active,inactive',
        ]);

        $image_id = $data['image_id'] ?? null;
        unset($data['image_id']);

        $category = Category::create($data);

        $this->handleImageUpload($request, $category, $image_id);

        $res = new CategoryResource($category);

        return response($res, 201, ['message' => 'Category added successfully!']);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
            'image_id' => 'sometimes|numeric',
        ]);

        $image_id = $data['image_id'] ?? null;
        unset($data['image_id']);

        $category = Category::where('id', $id)->first();
        if (!$category) {
            return response(null, 404, ['message' => 'Category not found!']);
        }

        $category->update($data);

        $this->handleImageUpload($request, $category, $image_id);
        $res = new CategoryResource($category);

        return response($res, 200, ['message' => 'category updated successfully!']);
    }

    public function destroy(Request $request, string $id)
    {
        $category = Category::where('id', $id)->first();
        if (!$category) {
            return response(null, 404, ['message' => 'category not found!']);
        }

        $category->delete();

        return response(null, 204, ['message' => 'category deleted successfully!']);
    }

    public function restore(string $id)
    {
        $category = Category::withTrashed()->where('id', $id)->first();

        if (!$category) {
            return response(null, 404, ['message' => 'category not found!']);
        }

        $category->restore();

        return response([], 200, ['message' => 'Category restored successfully!']);
    }

    public function thrashed()
    {
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 20;
        $order = request('order') ?? 'desc';
        $search = request(['search']) ?? null;

        $categories = Category::onlyTrashed()
            ->filter($search)
            ->orderBy('updated_at', $order)
            ->paginate($limit, ['*'], 'page', $page);

        return CategoryResource::collection($categories);
    }

    public function status(Request $request, string $id)
    {
    }
}
