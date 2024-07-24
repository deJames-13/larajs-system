<?php

namespace App\Imports\Categories;

use App\Models\Category;
use App\Models\Image;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CategoriesSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Update or create the category
            $category = Category::updateOrCreate(
                ['name' => $row['name']],
                [
                    'slug' => $row['slug'],
                    'description' => $row['description'],
                    'status' => $row['status'],
                ]
            );

            Log::info("Category created or updated: ", ['category' => $category->toArray()]);

            // If the category was newly created, add default images
            if ($category->wasRecentlyCreated) {
                Log::info("Category was recently created, adding default images.", ['category_id' => $category->id]);
                $this->addDefaultImagesToCategory($category);
            }
        }
    }

    protected function addDefaultImagesToCategory($category)
    {
        $defaultImages = [
            'DefaultCategory1.jpg',
            'DefaultCategory2.jpg',
            'DefaultCategory3.jpg'
        ];

        foreach ($defaultImages as $imageName) {
            // Use public_path to ensure correct path resolution
            $sourcePath = public_path('storage/DefaultImages/' . $imageName);
            $destinationPath = public_path('storage/Category/' . $imageName);

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
                    ['path' => 'storage/Category/' . $imageName]
                );

                Log::info("Image record created or found: ", ['image' => $image->toArray()]);

                // Add the entry to the category_images table if it does not already exist
                DB::table('category_images')->updateOrInsert(
                    ['category_id' => $category->id, 'image_id' => $image->id]
                );

                Log::info("Category images record created or found: ", ['category_id' => $category->id, 'image_id' => $image->id]);
            } else {
                Log::error("Source file does not exist: ", ['sourcePath' => $sourcePath]);
            }
        }
    }
}
