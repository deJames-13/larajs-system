<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\Api\UserController;
// use App\Http\Controllers\AuthController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// API AUTH: cant do this, need to handle tokens
// Route::group(["middleware" => "guest"], function () {
//     Route::post("/admin/login", [AuthController::class, "authenticate"]);
//     Route::post("/login", [AuthController::class, "authenticate"]);
//     Route::post("/register", [AuthController::class, "store"]);
// });

// Search Functions
Route::get('/autocomplete', [SearchController::class, 'autocomplete']);
Route::post('/search', [SearchController::class, 'search']);

// CRUD
$crud = [
    'products' => [
        'controller' => ProductController::class,
    ],

    'promos' => [
        'controller' => PromoController::class,
    ],

    'brands' => [
        'controller' => BrandController::class,
    ],

    'categories' => [
        'controller' => CategoryController::class,
    ],

    'users' => [
        'controller' => UserController::class,
        'middleware' => ['role:admin'],
    ],
    // "comments"?
];

foreach ($crud as $prefix => $config) {
    $controller = $config['controller'];
    $middleware = isset($config['middleware']) ? $config['middleware'] : [];
    $middleware = is_array($middleware) ? $middleware : [$middleware];

    // prevent non-ajax requests
    array_push($middleware, 'only.ajax');
    Route::get("/$prefix", [$controller, 'index'])->name($prefix . '.all')->middleware($middleware);
    Route::get("/$prefix/{id}", [$controller, 'show'])->name($prefix . '.get')->middleware($middleware);

    // include auth:sanctum middleware, only for authenticated users
    array_push($middleware, 'auth:sanctum');
    array_push($middleware, 'role:staff,admin');

    // CREATE
    Route::post("/$prefix", [$controller, 'store'])
        ->name($prefix . '.store')
        ->middleware($middleware);

    // DELETE
    Route::match(['delete'], "/$prefix/{id}", [$controller, 'destroy'])
        ->name($prefix . '.destroy')
        ->middleware($middleware);

    // UPDATE
    Route::match(['put', 'post'], "/$prefix/{id}", [$controller, 'update'])
        ->name($prefix . '.update')
        ->middleware($middleware);

    // RESTORE
    Route::match(['put', 'post'], "/$prefix/{id}/restore", [$controller, 'restore'])
        ->name($prefix . '.restore')
        ->middleware($middleware);

    // THRASHED - this is where my code is
    Route::get('/thrashed/' . $prefix, [$controller, 'thrashed'])
        ->name($prefix . '.thrashed')
        ->middleware($middleware);

    // EXPORTS
    Route::get("/exports/$prefix/{type}", [TableController::class, $prefix . 'Export'])
        ->middleware($middleware);

    // STATUS
    Route::post("/$prefix/status/{id}", [$controller, 'status'])
        ->name($prefix . '.status')
        ->middleware($middleware);
}

// MANUALLY ADDED
Route::group(['middleware' => 'auth:sanctum', 'only.ajax'], function () {
    // PROFILE
    Route::post('/confirm-password', [UserController::class, 'confirmPassword']);

    Route::prefix('profile')->group(function () {
        Route::get('/', [UserController::class, 'profile']);
        Route::get('/{id}', [UserController::class, 'profile']);
        Route::match(['put', 'post'], '/{id}', [UserController::class, 'update']);
        Route::match(['put', 'post'], '/status/{id}', [UserController::class, 'status']);
        Route::match(['post'], '/delete/{id}', [UserController::class, 'destroy']);
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
        Route::get('/metadata', [OrderController::class, 'metadata'])->middleware(['role:staff,admin']);
        Route::post('/checkout', [OrderController::class, 'store']);
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::put('/{id}', [OrderController::class, 'update']);
    });

    // export
    Route::get('exports/orders/{type}', [TableController::class, 'ordersExport'])
        ->name('orders.export')
        ->middleware(['auth:sanctum', 'role:staff,admin']);

    // CHARTS
    // insert chart function name here with url equivalent
    $charts = [
        'orderPerMonth' => 'order-per-month',
        'customerPerAddress' => 'customer-per-address',
        'productsSold' => 'products-sold',
        'ordersRevenue' => 'orders-revenue',
        'noStock' => 'no-stock',
        'lowStock' => 'low-stock',
    ];
    // no need to touch
    foreach ($charts as $chart => $url) {
        Route::get("/charts/$url", [ChartController::class, $chart])->middleware(['auth:sanctum', 'role:staff,admin', 'only.ajax']);
    }
});
