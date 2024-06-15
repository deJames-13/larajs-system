<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'sku_code' => fake()->unique()->regexify('[A-Z]{3}-[0-9]{3}'), // ABC-123
            'description' => fake()->paragraph(),
            'specifications' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 1, 1000),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Product $item) {
            $item->stock()->create([
                'quantity' => fake()->numberBetween(1, 100),
            ]);
        });
    }
}
