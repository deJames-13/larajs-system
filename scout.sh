#!/usr/bin/sh
php artisan optimize;

php artisan scout:delete-all-index
php artisan scout:flush
php artisan scout:sync-index-settings
php artisan scout:import "App\Models\Product"
php artisan scout:import "App\Models\Brand"
php artisan scout:import "App\Models\Promos"
php artisan scout:import "App\Models\Category"
php artisan scout:import "App\Models\Order"
