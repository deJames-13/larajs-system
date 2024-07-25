<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Api\ProductController;



Route::get('/test', [ProductController::class, 'ratings']);

Route::get('/home', [PageController::class, 'home'])->name('home');
Route::get('/', [PageController::class, 'home'])->name('shop');


$crud = [
    'product',
    // INFO: CONVERTED to JS/JQUERY
    // "promos",
    // "brands",
    // "categories",
    // "users",
];

// TO FIX
foreach ($crud as $prefix) {
    $prefixPlural = str_replace('ys', 'ies', $prefix . 's');
    Route::get("/$prefixPlural", [PageController::class, $prefixPlural])->name("$prefixPlural.index");
    Route::get("/$prefixPlural/{id}", [PageController::class, $prefix])->name("$prefixPlural.show");
}

// GLOBAL SEARCH
Route::get('/search', [PageController::class, 'search'])->name('search');



require __DIR__ . '/auth.php';
