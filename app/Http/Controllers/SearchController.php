<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Promos;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

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
        $results = collect($searchIn)->flatMap(function ($model, $key) use ($search) {
            return $model::search($search)->take(10)->get()->map(function ($item) use ($model, $key) {
                return [
                    'id' => $item->id,
                    'label' => $item->name,
                    'type' => strtolower(class_basename($model)),
                    'link' => "/$key/" . $item->id
                ];
            });
        });
        return response()->json($results);
    }

    // Laravel Scout - MeiliSearch
    public function search(Request $request)
    {
        $validated = $request->validate(['term' => 'required|string|max:255']);
        $search = str_replace(['%', '_'], ['\%', '\_'],  $validated['term']);

        $q = [
            "perPage" => $request->input('perPage', 10),
            "page" => $request->input('page', 1),
            "orderBy" => $request->input('orderBy', 'name'),
            "sort"  => $request->input('sort', 'asc'),
            "types" => $request->input('types', ['products', 'categories', 'brands', 'promos']),
            "checkStock" => ['products'],
        ];

        $searchIn = [
            'products' => Product::class,
            'categories' => Category::class,
            'brands' => Brand::class,
            'promos' => Promos::class,
        ];

        $allResults = collect($searchIn)->flatMap(function ($model, $key) use ($search) {
            return $model::search($search)->take(10)->get()->map(function ($item) use ($model, $key) {
                return [
                    'item' => $item,
                    'label' => $item->name,
                    'type' => strtolower(class_basename($model)),
                    'link' => "/$key/" . $item->id
                ];
            });
        });

        $sorted = $allResults->sortBy($q['orderBy'], SORT_REGULAR, $q['sort'] === 'desc');
        $sliced = $sorted->slice(($q['page'] - 1) * $q['perPage'], $q['perPage'])->values();

        $paginator = new LengthAwarePaginator(
            $sliced,
            $sorted->count(),
            $q['perPage'],
            $q['page'],
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $currentPage = $paginator->currentPage();
        $lastPage = $paginator->lastPage();

        $pagination = [
            'first' => $paginator->url(1),
            'last' => $paginator->url($lastPage),
            'next' => $currentPage < $lastPage ? $paginator->url($currentPage + 1) : null,
            'prev' => $currentPage > 1 ? $paginator->url($currentPage - 1) : null,
        ];
        return response()->json(
            [
                'results' => $paginator->items(),
                'pagination' => $pagination,
                'current_page' => $currentPage,
                'last_page' => $lastPage,
            ]
        );
    }
}
