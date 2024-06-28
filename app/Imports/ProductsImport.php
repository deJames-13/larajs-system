<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Database\Eloquent\ModelNotFoundException;



class ProductsImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            try {

                /**
                 * Assuming that the imported file has appropriate headings
                 * !IMPORTANT: Refer to the ProductsExport.php file to see the HEADINGS
                 */
                $item = Product::updateOrCreate([
                    'sku_code' => $row['sku_code'],
                ], [
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'specifications' => $row['specifications'],
                    'price' => $row['price'],
                ]);
                if (isset($row['stock'])) {
                    $item->stock()->updateOrCreate([
                        'product_sku_code' => $row['sku_code'],
                    ], [
                        'quantity' => $row['stock'],
                    ]);
                }
            } catch (ModelNotFoundException $e) {
            }
        }
    }
}
