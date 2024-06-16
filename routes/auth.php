<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TableController;


// Guess routes
Route::group(['middleware' => 'guest'], function () {
    Route::get('/admin/login', [AuthController::class, 'login'])->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'authenticate'])->name('admin.authenticate');
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate'])->name('authenticate');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'store'])->name('store');
});

// Auth pages
Route::group(['middleware' => 'auth'], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // ADMIN ONLY
    Route::group(['prefix' => 'admin', 'middleware' => ['role:admin']], function () {

        // TABLES
        Route::get('/products', [TableController::class, 'products'])->name('tables.products');

        // Products
        Route::get('/products/create', [PageController::class, 'productCreate'])->name('products.create');
        Route::get('/products/edit/{id}', [PageController::class, 'productEdit'])->name('products.edit');


        // PDFS

    });
});
