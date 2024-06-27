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
            'name' => fake()->word(),
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

            // random brand
            $brand = \App\Models\Brand::inRandomOrder()->first();
            $item->brands()->attach($brand->id);

            // random categories
            $categories = \App\Models\Category::inRandomOrder()->limit(3)->get();
            $item->categories()->attach($categories->pluck('id'));

            // random promos
            $promos = \App\Models\Promos::inRandomOrder()->limit(2)->get();
            $item->promos()->attach($promos->pluck('id'));


            $item->stock()->create([
                'quantity' => fake()->numberBetween(1, 100),
            ]);
        });
    }
}
