<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ChartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

Route::get("/test", function () {
    return response()->json(["message" => "API is working"]);
});

// API AUTH: cant do this, need to handle tokens
// Route::group(["middleware" => "guest"], function () {
//     Route::post("/admin/login", [AuthController::class, "authenticate"]);
//     Route::post("/login", [AuthController::class, "authenticate"]);
//     Route::post("/register", [AuthController::class, "store"]);
// });



// Search Functions
Route::get("/autocomplete", [SearchController::class, "autocomplete"]);


// add from here on out: make sure there are 3 functions in controller: store - destroy - update
$crud = [
    "products" => ProductController::class,
    "promos" => PromoController::class,
    "brands" => BrandController::class,
    "categories" => CategoryController::class,
    // "comments"?
];

foreach ($crud as $prefix => $controller) {
    Route::get("/$prefix", [$controller, "index"])->name($prefix . ".all");
    Route::get("/$prefix/{id}", [$controller, "show"])->name($prefix . ".get");
}


Route::group(["middleware" => "auth:sanctum"], function () use ($crud) {

    foreach ($crud as $prefix => $controller) {
        // Crud Functions: NOTE: use of {id} instead of {item} in the route is much better for crud operations
        Route::post("/$prefix", [$controller, "store"])->name($prefix . ".store");
        Route::delete("/$prefix/{id}", [$controller, "destroy"])->name($prefix . ".destroy");
        Route::match(["put", "post"], "/$prefix/{id}", [$controller, "update"])->name($prefix . ".update");

        // TABLES
        Route::get("/tables/" . $prefix, [TableController::class, $prefix]);

        // EXPORTS
        Route::get("/exports/$prefix/{type}", [TableController::class, $prefix . "Export"]);
    }

    // Cart
    Route::prefix("cart")->group(function () {
        Route::get("/", [CartController::class, "index"]);
        Route::post("/", [CartController::class, "store"]);
        Route::put("/", [CartController::class, "update"]);
        Route::delete("/{id}", [CartController::class, "destroy"]);
    });

    // orders/checkout
    Route::get("/tables/orders", [TableController::class, "orders"]);
    Route::prefix("orders")->group(function () {
        Route::post("/checkout", [OrderController::class, "store"]);
        Route::get("/", [OrderController::class, "index"]);
        Route::get("/{id}", [OrderController::class, "show"]);
        Route::put("/{id}", [OrderController::class, "update"]);
    });

    // CHARTS
    // insert chart function name here with url equivalent
    $charts = [
        'orderPerMonth' => 'order-per-month',
    ];
    // no need to touch
    foreach ($charts as $chart => $url) {
        Route::get("/charts/$url", [ChartController::class, $chart]);
    }
});
