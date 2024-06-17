<?php

namespace App\Http\Controllers\Api;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImageController extends Controller
{
    public function delete(string $id)
    {
        $image = Image::where('id', $id)->first();
        if ($image) {
            $image->delete();
            return response(['message' => 'Image deleted successfully!']);
        }
        return response(['message' => 'Image not found!'], 404);
    }
}
