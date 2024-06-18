<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;


Route::get('/mailorder', function () {
    return view('mail.order-status');
});

Route::get('/home', [PageController::class, 'home'])->name('home');
Route::get('/', [PageController::class, 'home'])->name('shop');
Route::get('/cart', [PageController::class, 'cart'])->name('cart');

// Products
Route::prefix('products')->group(function () {
    Route::get('/', [PageController::class, 'products'])->name('products.index');
    Route::get('/{id}', [PageController::class, 'product'])->name('products.show');
});



Route::prefix('promos')->group(function () {
    Route::get('/', [PageController::class, 'promos'])->name('promos.index');
    Route::get('/{id}', [PageController::class, 'promo'])->name('promos.show');
});

require __DIR__ . '/auth.php';
