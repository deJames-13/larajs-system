<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;


Route::get('/mailorder', function () {
    return view('mail.order-status');
});

Route::get('/home', [PageController::class, 'home'])->name('home');
Route::get('/', [PageController::class, 'home'])->name('shop');
Route::get('/cart', [PageController::class, 'cart'])->name('cart');


$crud = [
    'product',
    'brand',
    'promo',
    'category',
];

// TO FIX
foreach ($crud as $prefix) {
    $prefix = str_replace('ys', 'ies', $prefix . 's');
    Route::get("/$prefix", [PageController::class, $prefix])->name("$prefix.index");
    Route::get("/$prefix/{id}", [PageController::class, $prefix])->name("$prefix.show");
}

// GLOBAL SEARCH
Route::get('/search', [PageController::class, 'search'])->name('search');



require __DIR__ . '/auth.php';
