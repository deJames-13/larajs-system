<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->word(),
            "slug" => fake()->slug(),
            "description" => fake()->sentence(),
            // "image" => fake()->imageUrl(),
            // "status" => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
