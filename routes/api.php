<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PromoController;



Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.all');
    Route::get('/{id}', [ProductController::class, 'show'])->name('products.get');
});

Route::prefix('promos')->group(function () { // Add this block for promos
    Route::get('/', [PromoController::class, 'index'])->name('promos.all');
    Route::get('/{id}', [PromoController::class, 'show'])->name('promos.get');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // TABLES
    Route::prefix('tables')->group(function () {
        Route::get('/products', [TableController::class, 'products']);
        Route::get('/promos', [TableController::class, 'promos']);
    });

    // EXPORTS
    Route::prefix('exports')->group(function () {
        Route::get('/items/{type}', [TableController::class, 'itemsExport']);
    });


    // NOTE: use of {id} instead of {item} in the route is much better for crud operations
    // Products
    Route::prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
        Route::match(['put', 'post'], '/{id}', [ProductController::class, 'update']);
    });

    // Promos
    Route::prefix('promos')->group(function () { // Add this block for promos
        Route::post('/', [PromoController::class, 'store']);
        Route::delete('/{id}', [PromoController::class, 'destroy']);
        Route::match(['put', 'post'], '/{id}', [PromoController::class, 'update']);
    });

    // Cart
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/', [CartController::class, 'store']);
        Route::put('/', [CartController::class, 'update']);
        Route::delete('/{id}', [CartController::class, 'destroy']);
    });

    // orders/checkout
    Route::prefix('orders')->group(function () {
        Route::post('/checkout', [OrderController::class, 'store']);
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::put('/{id}', [OrderController::class, 'update']);
    });
});
