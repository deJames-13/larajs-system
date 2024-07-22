<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\Api\ChartController;
// INFO: REMOVE COMMENTS AFTER



Route::post("/admin/orders", [TableController::class, "ordersImport"])->name("imports.orders");
Route::group(["middleware" => "auth"], function () {
    Route::post("/import/brands", [TableController::class, "brandsImport"])->name("imports.brands")->middleware("role:staff,admin");
});

// Guess ONLY
Route::group(["middleware" => "guest"], function () {
    Route::get("/admin/login", [AuthController::class, "login"])->name("admin.login");
    Route::post("/admin/login", [AuthController::class, "authenticate"])->name("admin.authenticate");
    Route::get("/login", [AuthController::class, "login"])->name("login");
    Route::post("/login", [AuthController::class, "authenticate"])->name("authenticate");
    Route::get("/register", [AuthController::class, "register"])->name("register");
    Route::post("/register", [AuthController::class, "store"])->name("auth.store");
});

// Auth ONLY
Route::group(["middleware" => "auth"], function () {
    Route::post("/logout", [AuthController::class, "logout"])->name("logout");

    // PROFILE
    Route::get("/profile", [PageController::class, "profile"])->name("profile");

    // Checkout
    Route::get("/checkout", [PageController::class, "checkout"])->name("checkout");

    // Orders
    Route::get("/orders", [PageController::class, "orders"])->name("orders");
    Route::get("/orders/{id}", [PageController::class, "order"])->name("order");


    //##################################################################################################################
    // ADMIN ONLY
    $prefix = "admin";
    $crud = [
        "products",
    ];
    // CHART PAGES: TODO: convert to js/jquery
    $charts = [
        'orderPerMonth' => 'order-per-month',
        'customerPerAddress' => 'customer-per-address',
        'productsSold' => 'products-sold',
        'ordersRevenue' => 'orders-revenue',
    ];
    // ADMIN DASHBOARD
    $adminPages = [
        "dashboard" => "/dashboard",
        "users" => "/users",
    ];

    foreach ($crud as $prefix) {
        // PDFS
        Route::get("/pdf/$prefix", [PdfController::class, $prefix . "Pdf"])
            ->name("pdf.$prefix")
            ->middleware("role:staff,admin");
        // Imports
        Route::post("/import/$prefix", [TableController::class, $prefix . "Import"])
            ->name("imports.$prefix")
            ->middleware("role:staff,admin");
    }

    foreach ($charts as $chart => $url) {
        Route::get("/$prefix/charts/$url", [ChartController::class, $chart])
            ->name('charts.' . $chart)
            ->middleware("role:staff,admin");
    }

    foreach ($adminPages as $page => $url) {
        Route::get($url, [PageController::class, $page])
            ->name("admin.$page")
            ->middleware("role:staff,admin");
    }
    //##################################################################################################################

});
