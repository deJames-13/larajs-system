<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            $item = Product::create([
                'name' => $row['name'],
                'sku_code' => $row['sku_code'],
                'description' => $row['description'],
                'specifications' => $row['specification'],
                'price' => $row['price'],
            ]);
            $item->stock()->create([
                'quantity' => $row['stock'],
            ]);
        }
    }
}
