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
        ProcessOrderSeed::dispatch();
    }
}
