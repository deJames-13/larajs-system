<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Promos;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Brand::factory(10)->create();
        Category::factory(10)->create();
        Promos::factory(10)->create();
        Product::factory()->count(50)->create();

        $this->call([
            UserSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
