<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Database\Eloquent\ModelNotFoundException;



class ProductsImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    // TOOOOOOO FIIIZZ
    public function collection(Collection $collection)
    {
        Debugbar::info($collection);
        $addCount = 0;
        $upCount = 0;
        foreach ($collection as $row) {
            try {
                // Use updateOrCreate to either update an existing product or create a new one
                $item = Product::updateOrCreate(
                    ['sku_code' => $row['sku_code']], // Unique identifier
                    [
                        'name' => $row['name'],
                        'description' => $row['description'],
                        'specifications' => $row['specifications'],
                        'price' => $row['price'],
                    ]
                );

                // Determine if the product was newly created or updated
                if ($item->wasRecentlyCreated) {
                    $addCount++;
                } else {
                    $upCount++;
                }

                // Update or create stock information
                $item->stock()->updateOrCreate(
                    ['product_sku_code' => $row['sku_code']],
                    ['quantity' => $row['stock'] ?? 0]
                );
            } catch (\Exception $e) {
                // Log the error for debugging
                // $sku = $row['sku_code'];
                // Log::error("Error processing product with SKU {$sku}: " . $e->getMessage());
            }
        }
        Debugbar::info("Added: $addCount, Updated: $upCount");
    }
}
