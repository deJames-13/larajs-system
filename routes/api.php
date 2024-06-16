<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\TableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});


Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.all');
    Route::get('/{id}', [ProductController::class, 'show'])->name('products.get');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // TABLES 
    Route::prefix('tables')->group(function () {
        Route::get('/products', [TableController::class, 'products']);
    });

    // NOTE: use of {id} instead of {item} in the route is much better for crud operations
    
    // products
    Route::prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });


});
