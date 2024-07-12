<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Support\Facades\Storage;

abstract class Controller
{
    public function handleProfileImage($request, $user) {}

    public function handleImageUpload($request, $model, $image_id = null)
    {
        if ($image_id) {
            $image = Image::find($image_id);
            if (! $image) {
                return 0;
            }
            $model->images()->save($image);

            return 1;
        } elseif ($request->hasFile('images')) {
            $images = $request->file('images');

            foreach ($images as $image) {
                $fileName = $image->getClientOriginalName();
                $imageName = time().'_'.$fileName;
                $modelName = strtolower(class_basename($model));
                $imagePath = $image->storeAs('public/'.$modelName, $imageName);

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

        if ($request->has('status')) {
            $model = $model::find($id);
            $model->status = $request->status;
            $model->save();

            return 1;
        }

        return 0;
    }
}
