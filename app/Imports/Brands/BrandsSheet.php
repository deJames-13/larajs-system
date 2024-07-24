<?php

namespace App\Imports\Brands;

use App\Models\Brand;
use App\Models\Image;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BrandsSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Update or create the brand
            $brand = Brand::updateOrCreate(
                ['name' => $row['name']],
                [
                    'company' => $row['company'],
                    'website' => $row['website'],
                    'description' => $row['description'],
                    'status' => $row['status'],
                ]
            );

            Log::info("Brand created or updated: ", ['brand' => $brand->toArray()]);

            // If the brand was newly created, add default images
            if ($brand->wasRecentlyCreated) {
                Log::info("Brand was recently created, adding default images.", ['brand_id' => $brand->id]);
                $this->addDefaultImagesToBrand($brand);
            }
        }
    }

    protected function addDefaultImagesToBrand($brand)
    {
        $defaultImages = [
            'DefaultBrand1.jpg',
            'DefaultBrand2.jpg',
            'DefaultBrand3.jpg'
        ];

        foreach ($defaultImages as $imageName) {
            // Use public_path to ensure correct path resolution
            $sourcePath = public_path('storage/DefaultImages/' . $imageName);
            $destinationPath = public_path('storage/Brand/' . $imageName);

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
                    ['path' => 'storage/Brand/' . $imageName]
                );

                Log::info("Image record created or found: ", ['image' => $image->toArray()]);

                // Add the entry to the brand_images table if it does not already exist
                DB::table('brand_images')->updateOrInsert(
                    ['brand_id' => $brand->id, 'image_id' => $image->id]
                );

                Log::info("Brand images record created or found: ", ['brand_id' => $brand->id, 'image_id' => $image->id]);
            } else {
                Log::error("Source file does not exist: ", ['sourcePath' => $sourcePath]);
            }
        }
    }
}
