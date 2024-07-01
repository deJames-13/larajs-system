<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\Api\ChartController;

$crud = [
    "products",
    "promos",
    "brands",
    "categories",
    "users",
    // "comments"?
];

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
Route::group(["middleware" => "auth"], function () use ($crud) {
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
    Route::group(["prefix" => "admin", "middleware" => ["role:admin"]], function () use ($crud) {

        foreach ($crud as $prefix) {
            // TABLE pages
            Route::get("/$prefix", [TableController::class, $prefix])->name("tables.$prefix");

            // CREATE and EDIT pages
            Route::get("/$prefix/create", [PageController::class, $prefix . "Create"])->name("$prefix.create");
            Route::get("/$prefix/edit/{id}", [PageController::class, $prefix . "Edit"])->name("$prefix.edit");

            // PDFS
            Route::get("/pdf/$prefix", [PdfController::class, $prefix . "Pdf"])->name("pdf.$prefix");

            // Imports
            Route::post("/$prefix", [TableController::class, $prefix . "Import"])->name("imports.$prefix");
        }
        Route::get("/orders", [TableController::class, "orders"])->name("tables.aorders");


        // CHARTS
        // insert chart function name here with url equivalent
        $charts = [
            'orderPerMonth' => 'order-per-month',
            'customerPerAddress' => 'customer-per-address',
            'productsSold' => 'products-sold',
        ];
        // no need to touch
        foreach ($charts as $chart => $url) {
            Route::get("/charts/$url", [ChartController::class, $chart]);
        }
    });

    // ADMIN DASHBOARD
    // function => url
    // should have done this from the start
    $adminPages = [
        "dashboard" => "/dashboard",
        "users" => "/users",
    ];
    foreach ($adminPages as $page => $url) {
        Route::get($url, [PageController::class, $page])->name("admin.$page");
    }
    //##################################################################################################################

});
