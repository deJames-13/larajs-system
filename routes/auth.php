<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TableController;


// Guess ONLY
Route::group(['middleware' => 'guest'], function () {
    Route::get('/admin/login', [AuthController::class, 'login'])->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'authenticate'])->name('admin.authenticate');
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate'])->name('authenticate');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'store'])->name('store');
});

// Auth ONLY
Route::group(['middleware' => 'auth'], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Checkout
    Route::get('/checkout', [PageController::class, 'checkout'])->name('checkout');

    // Orders
    Route::get('/orders', [PageController::class, 'orders'])->name('orders');
    Route::get('/orders/{id}', [PageController::class, 'order'])->name('order');

    //##################################################################################################################
    // ADMIN ONLY
    Route::group(['prefix' => 'admin', 'middleware' => ['role:admin']], function () {
      
        // TABLES
        Route::get('/products', [TableController::class, 'products'])->name('tables.products');
        Route::get('/orders', [TableController::class, 'orders'])->name('tables.orders');
        Route::get('/promos', [TableController::class, 'promos'])->name('tables.promos');
        Route::get('/brands', [TableController::class, 'brands'])->name('tables.brands');
        Route::get('/categories', [TableController::class, 'categories'])->name('tables.categories');
      
        // Products
        Route::get('/products/create', [PageController::class, 'productCreate'])->name('products.create');
        Route::get('/products/edit/{id}', [PageController::class, 'productEdit'])->name('products.edit');

        // Promos
        Route::get('/promos/create', [PageController::class, 'promoCreate'])->name('promos.create');
        Route::get('/promos/edit/{id}', [PageController::class, 'promoEdit'])->name('promos.edit');

        // Brands
        Route::get('/brands/create', [PageController::class, 'brandCreate'])->name('brands.create');
        Route::get('/brands/edit/{id}', [PageController::class, 'brandEdit'])->name('brands.edit');

        // Categories
        Route::get('/categories/create', [PageController::class, 'categoryCreate'])->name('categories.create');
        Route::get('/categories/edit/{id}', [PageController::class, 'categoryEdit'])->name('categories.edit');

        // PDFS
        Route::get('/pdf/products', [PdfController::class, 'productsPdf'])->name('pdf.products');
    });
    //##################################################################################################################

  
    // IMPORTS
    Route::prefix('imports')->group(function () {
        Route::post('/products', [TableController::class, 'productsImport'])->name('imports.products');
        Route::post('/promos', [TableController::class, 'promosImport'])->name('imports.promos');
        Route::post('/brands', [TableController::class, 'brandsImport'])->name('imports.brands');
        Route::post('/categories', [TableController::class, 'categoriesImport'])->name('imports.categories');
    });
});
