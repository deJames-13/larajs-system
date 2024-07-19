<?php


namespace App\Exports\Products;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductsSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $products = [];

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
        $this->products = Product::all()->map(function ($product) {
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

        return $this->products->toArray();
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

    public function title(): string
    {
        return 'Products';
    }
}
