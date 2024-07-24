<?php

namespace App\Imports\Products;

use App\Models\Product;
use App\Models\Stock;
use App\Models\Image;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsSheet implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $required = ['name', 'sku_code', 'description', 'specifications', 'price', 'stock'];

            // Skip row if any of the required columns is missing
            if (count(array_intersect_key(array_flip($required), $row->toArray())) !== count($required)) {
                Debugbar::info('Skipping row: ' . json_encode($row));
                continue;
            }

            $skuCode = $row['sku_code'];

            $product = Product::updateOrCreate(
                ['sku_code' => $skuCode],
                [
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'specifications' => $row['specifications'],
                    'price' => $row['price'],
                ]
            );

            Stock::updateOrCreate(
                ['product_sku_code' => $skuCode],
                ['quantity' => $row['stock']]
            );

            // If the product was newly created, add default images
            if ($product->wasRecentlyCreated) {
                Log::info("Product was recently created, adding default images.", ['product_id' => $product->id]);
                $this->addDefaultImagesToProduct($product);
            }
        }
    }

    protected function addDefaultImagesToProduct($product)
    {
        $defaultImages = [
            'DefaultProduct1.jpg',
            'DefaultProduct2.jpg',
            'DefaultProduct3.jpg'
        ];

        foreach ($defaultImages as $imageName) {
            // Use public_path to ensure correct path resolution
            $sourcePath = public_path('storage/DefaultImages/' . $imageName);
            $destinationPath = public_path('storage/Product/' . $imageName);

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
                    ['path' => 'storage/Product/' . $imageName]
                );

                Log::info("Image record created or found: ", ['image' => $image->toArray()]);

                // Add the entry to the product_images table if it does not already exist
                DB::table('product_images')->updateOrInsert(
                    ['product_id' => $product->id, 'image_id' => $image->id]
                );

                Log::info("Product images record created or found: ", ['product_id' => $product->id, 'image_id' => $image->id]);
            } else {
                Log::error("Source file does not exist: ", ['sourcePath' => $sourcePath]);
            }
        }
    }
}
