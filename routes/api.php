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

    // add from here on out: make sure there are 3 functions in controller: store - destroy - update
    $crud = [
        'products' => ProductController::class,
        'promos' => PromoController::class,
        // 'brands' => BrandController::class,
        // 'categories' => CategoryController::class,
        // 'comments'?
    ];

    // NOTE: use of {id} instead of {item} in the route is much better for crud operations
    foreach ($crud as $prefix => $controller) {
        Route::post("/$prefix", [$controller, 'store'])->name($prefix . '.store');
        Route::delete("/$prefix/{id}", [$controller, 'destroy'])->name($prefix . '.destroy');
        Route::match(['put', 'post'], "/$prefix/{id}", [$controller, 'update'])->name($prefix . '.update');
    }
    // TABLES
    foreach ($crud as $table => $controller) {
        Route::get("/tables/" . $table, [TableController::class, $table]);
    }

    // EXPORTS
    Route::prefix('exports')->group(function () {
        Route::get('/items/{type}', [TableController::class, 'itemsExport']);
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
