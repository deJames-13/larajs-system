<?php

namespace App\Imports\Products;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsSheet implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (isset($row['name'], $row['sku_code'], $row['description'], $row['specifications'], $row['price'], $row['quantity'])) {
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
                    ['quantity' => $row['quantity']]
                );
            }
        }
    }
}
