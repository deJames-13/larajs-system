<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('ui.home');
})->name('home');





require __DIR__ . '/auth.php';
