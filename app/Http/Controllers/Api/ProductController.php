<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::all());
    }
    public function show(string $id)
    {
        $res = new ProductResource(Product::where('id', $id)->first());
        return $res;
    }

    public function store()
    {
    }
    public function update(string $id)
    {
    }
    public function delete(string $id)
    {
    }
    public function restore(string $id)
    {
    }
}
