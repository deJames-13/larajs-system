<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function handleImageUpload($request, $model)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $modelName = strtolower(class_basename($model));
            $imagePath = $image->storeAs('public/' . $modelName . 's', $imageName);
            $model->images()->create([
                'name' => $imageName,
                'path' => $imagePath
            ]);
        }
    }
}
