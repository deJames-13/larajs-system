<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use Barryvdh\Debugbar\Facades\Debugbar;

class CategoryController extends Controller
{
    public function search()
    {
        $category = Category::filter(request(['search']))->get();
        return CategoryResource::collection($category);
    }

    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    public function show(string $id)
    {
        $res = new CategoryResource(Category::where('id', $id)->first());
        return $res;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
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
        ]);

        $category = Category::where('id', $id)->first();
        if (!$category) return response(null, 404, ['message' => 'Category not found!']);

        $category->update($data);

        $res = new CategoryResource($category);
        return response($res, 200, ['message' => 'category updated successfully!']);
    }

    public function destroy(Request $request, string $id)
    {
        $category = Category::where('id', $id)->first();
        if (!$category) return response(null, 404, ['message' => 'category not found!']);

        $category->delete();
        return response(null, 204, ['message' => 'category deleted successfully!']);
    }

    public function restore(Request $request, string $id)
    {
        $category = Category::withTrashed()->where('id', $id)->first();
        if (!$category) return response(null, 404, ['message' => 'category not found!']);

        $category->restore();
        return response(null, 200, ['message' => 'category restored successfully!']);
    }
}