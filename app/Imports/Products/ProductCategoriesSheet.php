<?php

namespace App\Imports\Products;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\DB;

class ProductCategoriesSheet implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        $header = true;

        foreach ($rows as $row) {
            if ($header) {
                $header = false;
                continue;
            }

            $productId = $row[0];
            $categoryId = $row[1];

            $product = Product::find($productId);

            if ($product) {
                $category = Category::find($categoryId);

                if ($category) {
                    DB::table('product_categories')->updateOrInsert(
                        ['product_id' => $productId, 'category_id' => $categoryId]
                    );
                }
            }
        }
    }
}
