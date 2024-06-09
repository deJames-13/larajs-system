<?php

namespace App\Providers;


use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('Debugbar', \Barryvdh\Debugbar\Facades\Debugbar::class);
        $loader->alias('DataTables', \Yajra\DataTables\Facades\DataTables::class);
        $loader->alias('Excel', \Maatwebsite\Excel\Facades\Excel::class);
        $loader->alias('Pdf', \Barryvdh\DomPDF\Facade\Pdf::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Blade::if('role', function ($role) {
            return auth()->check() && auth()->user()->role == $role;
        });
    }
}
