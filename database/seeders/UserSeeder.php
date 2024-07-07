<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminExists = User::query()->where('email', 'admin@example.dev')->exists();
        $customerExists = User::query()->where('email', 'johndoe@example.dev')->exists();

        if (!$adminExists) {
            User::factory()->create([
                'username' => 'admin',
                'email' => 'admin@example.dev',
                'role' => 'admin',
            ]);
        }

        if (!$customerExists) {
            $user = User::factory()->create([
                'username' => 'johndoe',
                'email' => 'johndoe@example.dev',
            ]);
            $user->info()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                ]
            );
        }
        $user = \App\Models\User::factory(50)->create();
    }
}
