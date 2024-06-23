<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // admin
        $admin = \App\Models\User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@tunetown.dev',
            'role' => 'admin'
        ]);


        // customer
        $user = \App\Models\User::factory()->create([
            'username' => 'johndoe',
            'email' => 'johndoe@tunetown.dev'
        ]);
        $user->info()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone_number' => '1234567890',
            'address' => '123 Main St',
            'zip_code' => '12345'
        ]);
        $user = \App\Models\User::factory(20)->create();
    }
}
