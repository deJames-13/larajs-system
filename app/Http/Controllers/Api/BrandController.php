<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function search()
    {
        $brand = Brand::filter(request(['search']))->get();

        return BrandResource::collection($brand);
    }

    public function index()
    {
        return BrandResource::collection(Brand::all());
    }

    public function show(string $id)
    {
        $res = new BrandResource(Brand::where('id', $id)->first());

        return $res;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'website' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
        ]);

        $image_id = $data['image_id'] ?? null;
        unset($data['image_id']);

        $brand = Brand::create($data);

        $this->handleImageUpload($request, $brand, $image_id);

        $res = new BrandResource($brand);

        return response($res, 201, ['message' => 'Brand added successfully!']);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'website' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
        ]);

        $brand = Brand::where('id', $id)->first();
        if (! $brand) {
            return response(null, 404, ['message' => 'Brand not found!']);
        }

        $brand->update($data);

        $res = new BrandResource($brand);

        return response($res, 200, ['message' => 'Brand updated successfully!']);
    }

    public function destroy(string $id)
    {
        $brand = Brand::where('id', $id)->first();
        if (! $brand) {
            return response(null, 404, ['message' => 'Brand not found!']);
        }

        $brand->delete();

        return response(null, 204, ['message' => 'Brand deleted successfully!']);
    }

    public function restore(string $id)
    {
        $brand = Brand::withTrashed()->where('id', $id)->first();
        if (! $brand) {
            return response(null, 404, ['message' => 'Brand not found!']);
        }

        $brand->restore();

        return response([], 200, ['message' => 'Brand restored successfully!']);
    }

    public function thrashed()
    {
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 20;
        $order = request('order') ?? 'desc';
        $search = request(['search']) ?? null;

        $brands = Brand::onlyTrashed()
            ->filter($search)
            ->orderBy('updated_at', $order)
            ->paginate($limit, ['*'], 'page', $page);

        return BrandResource::collection($brands);
    }

}
