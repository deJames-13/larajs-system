<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

Route::get('/home', [PageController::class, 'home'])->name('home');
Route::get('/', [PageController::class, 'home'])->name('shop');
Route::get('/cart', [PageController::class, 'cart'])->name('cart');

// Products
Route::prefix('products')->group(function () {
    Route::get('/', [PageController::class, 'products'])->name('products.index');
    Route::get('/{id}', [PageController::class, 'product'])->name('products.show');
});




require __DIR__ . '/auth.php';
