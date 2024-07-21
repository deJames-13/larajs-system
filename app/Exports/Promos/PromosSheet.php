<?php

namespace App\Exports\Promos;

use App\Models\Promos;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class PromosSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $promos = [];

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $promos
         *
         * This maps the Promo Model to get an array of array with the COLUMNS that we want from the
         * HEADINGS.
         * This ensures that whatever is exported,
         * It can easily be imported back, by using logic with headings
         *
         */
        $this->promos = Promos::all()->map(function ($promo) {
            return [
                $promo->id,
                $promo->name,
                $promo->slug,
                $promo->description,
                $promo->status,
                $promo->discount,
                $promo->start_date,
                $promo->end_date,
            ];
        });

        return $this->promos->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'slug',
            'description',
            'status',
            'discount',
            'start_date',
            'end_date',
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
        return 'Promos';
    }
}
