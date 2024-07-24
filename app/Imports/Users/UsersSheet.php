<?php

namespace App\Imports\Users;

use App\Models\User;
use App\Models\Customer;
use App\Models\Image;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (empty($row['email']) || empty($row['username']) || empty($row['password']) || empty($row['role'])) {
                continue;
            }

            $user = User::updateOrCreate(
                ['email' => $row['email']],
                [
                    'username' => $row['username'],
                    'password' => Hash::make($row['password']),
                    'role' => $row['role'],
                    'status' => $row['status'] ?? 'active',
                ]
            );

            // Extract first name and last name from the username
            $nameParts = explode(' ', $row['username']);
            $firstName = $nameParts[0];
            $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

            Customer::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'phone_number' => $row['phone_number'] ?? null,
                    'address' => $row['address'] ?? null,
                    'zip_code' => $row['zip_code'] ?? null,
                ]
            );

            // If the user was newly created, add default images
            if ($user->wasRecentlyCreated) {
                Log::info("User was recently created, adding default images.", ['user_id' => $user->id]);
                $this->addDefaultImagesToUser($user);
            }
        }
    }

    protected function addDefaultImagesToUser($user)
    {
        $defaultImages = [
            'DefaultUser1.jpg',
            'DefaultUser2.jpg',
            'DefaultUser3.jpg'
        ];

        foreach ($defaultImages as $imageName) {
            // Use public_path to ensure correct path resolution
            $sourcePath = public_path('storage/DefaultImages/' . $imageName);
            $destinationPath = public_path('storage/User/' . $imageName);

            // Check if the source file exists
            if (file_exists($sourcePath)) {
                Log::info("Source file exists: ", ['sourcePath' => $sourcePath]);

                // Copy the image to the destination folder if it does not already exist
                if (!file_exists($destinationPath)) {
                    if (copy($sourcePath, $destinationPath)) {
                        Log::info("Image copied successfully: ", ['destinationPath' => $destinationPath]);
                    } else {
                        Log::error("Failed to copy image from source to destination: ", ['sourcePath' => $sourcePath, 'destinationPath' => $destinationPath]);
                        continue;
                    }
                }

                // Check if the image already exists in the images table
                $image = Image::firstOrCreate(
                    ['name' => $imageName],
                    ['path' => 'storage/User/' . $imageName]
                );

                Log::info("Image record created or found: ", ['image' => $image->toArray()]);

                // Add the entry to the user_images table if it does not already exist
                DB::table('user_images')->updateOrInsert(
                    ['user_id' => $user->id, 'image_id' => $image->id]
                );

                Log::info("User images record created or found: ", ['user_id' => $user->id, 'image_id' => $image->id]);
            } else {
                Log::error("Source file does not exist: ", ['sourcePath' => $sourcePath]);
            }
        }
    }
}
