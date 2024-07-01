<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class ProductsExport implements FromArray, WithHeadings, WithCustomCsvSettings
{
    use Exportable;

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
        $products = Product::all()->map(function ($product) {
            return [
                $product->id,
                $product->name,
                $product->sku_code,
                $product->description,
                $product->specifications,
                $product->price,
                $product->stock->quantity,
            ];
        });

        return $products->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'sku_code',
            'description',
            'specifications',
            'price',
            'stock',
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
}
