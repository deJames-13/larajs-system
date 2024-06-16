<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Barryvdh\Debugbar\Facades\Debugbar;

class TableController extends Controller
{

    public function products()
    {
        if (request()->ajax()) {
            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $products = Product::paginate($limit, ['*'], 'page', $page);

            $response = ProductResource::collection($products);
            Debugbar::info($response);
            return $response;
        }
        return view('admin.tables.products');
    }
}
