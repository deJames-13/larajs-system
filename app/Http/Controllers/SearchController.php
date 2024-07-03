<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Promos;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class SearchController extends Controller
{

    // jQuery autocomplete
    public function autocomplete()
    {
        $validated = request()->validate(['term' => 'required|string|max:255']);
        $search = str_replace(['%', '_'], ['\%', '\_'],  $validated['term']);
        $searchIn = (object)[
            'products' => Product::class,
            'categories' => Category::class,
            'brands' => Brand::class,
            'promos' => Promos::class,
        ];
        $results = collect($searchIn)->flatMap(function ($model) use ($search) {
            return $model::filter(['search' => $search])->limit(10)->get()->map(function ($item) use ($model) {
                return [
                    'label' => $item->name,
                    'id' => $item->id,
                    'type' => strtolower(class_basename($model))
                ];
            });
        });

        return response()->json($results);
    }

    // Laravel Scout MeiliSearch

}
