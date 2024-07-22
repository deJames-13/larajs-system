<?php

namespace Database\Seeders;

use App\Jobs\ProcessOrderSeed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderSeeder extends Seeder implements ShouldQueue
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = 500; // Customize this value as needed
        $random = true; // Assuming you want to keep the random behavior: random status, and dates

        ProcessOrderSeed::dispatch($count, $random);
    }
}
