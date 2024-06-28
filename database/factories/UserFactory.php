<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'username' => fake()->username(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
    public function configure()
    {
        $street_address1 = fake()->streetAddress();
        $street_address2 = fake()->streetAddress();
        $city = fake()->city();
        $region = fake()->state();
        $country = fake()->country();

        $address = $street_address1 . ', ' . $street_address2 . ', ' . $city . ', ' . $region . ', ' . $country;



        return $this->afterCreating(function (\App\Models\User $user) use ($address) {
            $user->info()->create([
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'phone_number' => fake()->unique()->phoneNumber(),
                'address' => $address,
                'zip_code' => fake()->postcode(),
                // 'profile_image' => fake()->imageUrl(),
            ]);
        });
    }
}
