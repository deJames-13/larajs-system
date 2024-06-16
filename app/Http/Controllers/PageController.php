<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{

    public function productCreate()
    {
        return view('pages.products.create');
    }

    public function productEdit(string $id)
    {
        return view('pages.products.edit', ['id' => $id]);
    }
}
