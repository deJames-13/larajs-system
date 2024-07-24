<?php

namespace App\Imports\Promos;

use App\Models\Promos;
use App\Models\Image;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PromosSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Update or create the promo
            $promo = Promos::updateOrCreate(
                ['name' => $row['name']],
                [
                    'slug' => $row['slug'],
                    'description' => $row['description'],
                    'status' => $row['status'],
                    'discount' => $row['discount'],
                    'start_date' => \Carbon\Carbon::parse($row['start_date']),
                    'end_date' => \Carbon\Carbon::parse($row['end_date']),
                ]
            );

            Log::info("Promo created or updated: ", ['promo' => $promo->toArray()]);

            // If the promo was newly created, add default images
            if ($promo->wasRecentlyCreated) {
                Log::info("Promo was recently created, adding default images.", ['promo_id' => $promo->id]);
                $this->addDefaultImagesToPromo($promo);
            }
        }
    }

    protected function addDefaultImagesToPromo($promo)
    {
        $defaultImages = [
            'DefaultPromo1.jpg',
            'DefaultPromo2.jpg',
            'DefaultPromo3.jpg'
        ];

        foreach ($defaultImages as $imageName) {
            // Use public_path to ensure correct path resolution
            $sourcePath = public_path('storage/DefaultImages/' . $imageName);
            $destinationPath = public_path('storage/Promos/' . $imageName);

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
                    ['path' => 'storage/Promos/' . $imageName]
                );

                Log::info("Image record created or found: ", ['image' => $image->toArray()]);

                // Add the entry to the promo_images table if it does not already exist
                DB::table('promo_images')->updateOrInsert(
                    ['promo_id' => $promo->id, 'image_id' => $image->id]
                );

                Log::info("Promo images record created or found: ", ['promo_id' => $promo->id, 'image_id' => $image->id]);
            } else {
                Log::error("Source file does not exist: ", ['sourcePath' => $sourcePath]);
            }
        }
    }
}
