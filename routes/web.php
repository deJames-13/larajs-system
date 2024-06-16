<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;


Route::get('/', function () {
    return view('index');
})->name('home');


// Products
Route::prefix('products')->group(function () {
    Route::get('/', [PageController::class, 'products'])->name('products.index');
    Route::get('/{product}', [PageController::class, 'product'])->name('products.show');
});




require __DIR__ . '/auth.php';
