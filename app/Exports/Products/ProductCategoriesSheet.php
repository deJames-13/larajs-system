<?php

namespace App\Exports\Products;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;;

class ProductCategoriesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $data;

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $products
         * 
         * This maps the Product Model to get an array of array with the COLUMNS that we want from the
         * HEADINGS.
         * This make sures that whatever is exported,
         * It can easily imported back, by using logic with headings
         * 
         */
        $this->data = Product::all()->flatMap(function ($product) {
            $categories = $product->categories;
            if (!$categories) {
                return [];
            }
            return $categories->map(function ($category) use ($product) {
                return [
                    'product_id' => $product->id,
                    'category_id' => $category->id,
                    'category_name' => $category->name,
                ];
            });
        });

        return $this->data->toArray();
    }

    public function headings(): array
    {
        return [
            'product_id',
            'category_id',
            'category_name',
        ];
    }

    public function getCsvSettings(): array
    {
        return [
            'writer' => 'stream',
            'heading_row' => 1,
            'cache_size' => 1000,
            'pre_calculate_formulas' => false,
        ];
    }

    public function title(): string
    {
        return 'ProductCategories';
    }
}
