<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class Controller
{

    public function getResources($model, $resource, $with = [])
    {
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 10;
        $sort  = request('sort') ?? 'updated_at';
        $order = request('order') ?? 'desc';
        $search = request('search') ?? '';

        if (!is_numeric($page) || $page < 1) $limit = 1;
        if (!is_numeric($limit) || $limit < 1) $limit = 10;
        if (!in_array($order, ['asc', 'desc'])) $order = 'asc';


        $data = $model::filter(['search' => $search, 'sort' => $sort, 'order' => $order])
            ->paginate($limit, ['*'], 'page', $page);


        $data->load($with);
        $response = $resource::collection($data);


        Debugbar::info($response);
        return $response;
    }

    public function getResource($id, $model, $resource, $with = [])
    {
        $data = $model::find($id);
        $data->load($with);

        if (!$data) {
            return response()->json(['message' => 'Resource not found'], 404);
        }
        $response = new $resource($data);

        return $response;
    }

    public function handleImageUpload($request, $model, $image_id = null)
    {
        if ($image_id) {
            $image = Image::find($image_id);
            if (!$image) {
                return 0;
            }
            $model->images()->save($image);

            return 1;
        } elseif ($request->hasFile('images')) {
            $images = $request->file('images');

            foreach ($images as $image) {
                $fileName = $image->getClientOriginalName();
                $imageName = time() . '_' . $fileName;
                $modelName = strtolower(class_basename($model));
                $imagePath = $image->storeAs('public/' . $modelName, $imageName);

                $model->images->each(function ($image) {
                    Storage::delete(str_replace('storage', 'public', $image->path));
                    $image->delete();
                });

                $model->images()->create([
                    'name' => $fileName,
                    'path' => str_replace('public', 'storage', $imagePath),
                ]);
            }

            return 1;
        }

        return 0;
    }

    public function handleStatus($request, $model, $id)
    {
        if (!$request->has('status')) {
            return 0;
        }
        $data = $request->validate(['status' => 'required|in:active,inactive']);
        $model = $model::findOrFail($id);

        Debugbar::info([$model, $data]);

        $model->status = $data['status'];
        $model->save();

        return 1;
    }
}
