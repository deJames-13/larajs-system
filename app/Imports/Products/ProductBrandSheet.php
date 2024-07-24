<?php

namespace App\Imports\Products;

use App\Models\Product;
use App\Models\Brand;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\DB;

class ProductBrandSheet implements ToCollection
{
    public function collection(Collection $rows)
    {
        $header = true;

        foreach ($rows as $row) {
            if ($header) {
                $header = false;
                continue;
            }

            $productId = $row[0];
            $brandId = $row[1];

            $product = Product::find($productId);

            if ($product) {
                $brand = Brand::find($brandId);

                if ($brand) {
                    DB::table('product_brands')->updateOrInsert(
                        ['product_id' => $productId, 'brand_id' => $brandId]
                    );
                }
            }
        }
    }
}
