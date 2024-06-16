<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function products()
    {
        return view('pages.products.index');
    }
    public function product(string $id)
    {
        $item = Product::find($id);
        return view('pages.products.show', ['item' => $item]);
    }


    public function productCreate()
    {
        return view('pages.products.create');
    }

    public function productEdit(string $id)
    {
        return view('pages.products.edit', ['id' => $id]);
    }
}
