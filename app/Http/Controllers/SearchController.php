<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Promos;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function autocomplete()
    {
        $validated = request()->validate(['search' => 'required|string|max:255']);
        $search = str_replace(['%', '_'], ['\%', '\_'],  $validated['search']);
        $searchIn = (object)[
            'products' => Product::class,
            'categories' => Category::class,
            'brands' => Brand::class,
            'promos' => Promos::class,
        ];

        $results = collect($searchIn)->map(function ($model) use ($search) {
            return $model::filter(['search' => $search])->limit(10)->get();
        });

        return response()->json($results);
    }
}
