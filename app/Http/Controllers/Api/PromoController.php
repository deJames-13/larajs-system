<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PromoResource;
use App\Models\Promos;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    public function search()
    {
        $promo = Promos::filter(request(['search']))->get();

        return PromoResource::collection($promo);
    }

    public function index()
    {
        return PromoResource::collection(Promos::all());
    }

    public function show(string $id)
    {
        $res = new PromoResource(Promos::where('id', $id)->first());

        return $res;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:promos,slug',
            'description' => 'required|string',
            'image' => 'sometimes|string',
            'status' => 'required|string',
            'discount' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'image_id' => 'sometimes|numeric',
        ]);

        $image_id = $data['image_id'] ?? null;
        unset($data['image_id']);

        $promo = Promos::create($data);

        $this->handleImageUpload($request, $promo, $image_id);

        $res = new PromoResource($promo);

        return response($res, 201, ['message' => 'Promo added successfully!']);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'slug' => 'sometimes|string|exists:promos,slug',
            'description' => 'sometimes|string',
            'image' => 'sometimes|string',
            'status' => 'sometimes|string',
            'discount' => 'sometimes|numeric',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
            'image_id' => 'sometimes|numeric',
        ]);
        $image_id = $data['image_id'] ?? null;
        unset($data['image_id']);

        $promo = Promos::where('id', $id)->first();
        if (!$promo) {
            return response(null, 404, ['message' => 'Promo not found!']);
        }

        $promo->update($data);

        $this->handleImageUpload($request, $promo, $image_id);
        $res = new PromoResource($promo);

        return response($res, 200, ['message' => 'Promo updated successfully!']);
    }

    public function destroy(string $id)
    {
        $promo = Promos::where('id', $id)->first();
        if (!$promo) {
            return response(null, 404, ['message' => 'Promo not found!']);
        }

        $promo->delete();

        return response(null, 204, ['message' => 'Promo deleted successfully!']);
    }

    public function restore(string $id)
    {
        $promo = Promos::withTrashed()->where('id', $id)->first();
        if (!$promo) {
            return response(null, 404, ['message' => 'Promo not found!']);
        }

        $promo->restore();

        return response([], 200, ['message' => 'Promo restored successfully!']);
    }

    public function thrashed()

    {
    }

    public function status(Request $request, string $id)
    {
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 20;
        $order = request('order') ?? 'desc';
        $search = request(['search']) ?? null;

        $promos = Promos::onlyTrashed()
            ->filter($search)
            ->orderBy('updated_at', $order)
            ->paginate($limit, ['*'], 'page', $page);

        return PromoResource::collection($promos);
    }

}
