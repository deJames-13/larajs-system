<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promos>
 */
class PromosFactory extends Factory
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
            "discount" => fake()->randomFloat(2, 0, 100),
            "start_date" => fake()->dateTime(),
            "end_date" => fake()->dateTime(),
            "status" => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
