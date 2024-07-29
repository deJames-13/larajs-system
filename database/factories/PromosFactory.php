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
        $promo_types = ['percentage', 'fixed'];
        $promo_for = ['product', 'order', 'shipping'];
        return [
            "name" => fake()->word(),
            "slug" => fake()->slug(),
            "description" => fake()->sentence(),
            "discount" => fake()->randomFloat(2, 0, 100),
            "promo_type" => fake()->randomElement($promo_types),
            "promo_for" => fake()->randomElement($promo_for),
            "start_date" => fake()->dateTime(),
            "end_date" => fake()->dateTime(),
            "status" => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
