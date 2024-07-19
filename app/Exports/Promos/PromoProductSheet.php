<?php

namespace App\Exports\Promos;

use App\Models\Promos;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;


class PromoProductSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $data;

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $promos
         *
         * This maps the Product Model to get an array of array with the COLUMNS that we want from the
         * HEADINGS.
         * This make sures that whatever is exported,
         * It can easily imported back, by using logic with headings
         *
         */
        $this->data = Promos::all()->flatMap(function ($promo) {
            $product = $promo->products;
            if (!$product) {
                return [];
            }
            return $product->map(function ($product) use ($promo) {
                return [
                    'promo_id' => $promo->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                ];
            });
        });

        return $this->data->toArray();
    }

    public function headings(): array
    {
        return [
            'promo_id',
            'product_id',
            'product_name',
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
        return 'PromoProduct';
    }
}
