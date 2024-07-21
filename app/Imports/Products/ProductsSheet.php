<?php

namespace App\Imports\Products;

use App\Models\Stock;
use App\Models\Product;
use Illuminate\Support\Collection;
use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsSheet implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {

            $required = ['name', 'sku_code', 'description', 'specifications', 'price', 'stock'];

            // skip row if any of the required columns is missing
            if (count(array_intersect_key(array_flip($required), $row->toArray())) !== count($required)) {
                Debugbar::info('Skipping row: ' . json_encode($row));
                continue;
            }

            $skuCode = $row['sku_code'];

            Product::updateOrCreate(
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
        }
    }
}
