<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createOrder(100);
    }
    public function createOrder($count)
    {
        for ($i = 0; $i < $count; $i++) {
            DB::transaction(function () {
                $customer = User::inRandomOrder()->first();
                $product = Product::inRandomOrder()->first();
                if (!$customer || !$product) {
                    return;
                }
                $order = $customer->orders()->create([
                    'status' => 'pending',
                    'shipping_address' => $customer->info->address,
                ]);

                $order->products()->attach(
                    $product->id,
                    ['quantity' => rand(1, 5),]
                );
            });
        }
    }
}
