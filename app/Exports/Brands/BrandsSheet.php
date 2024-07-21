<?php


namespace App\Exports\Brands;

use App\Models\Brand;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class BrandsSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $brands = [];

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $brands
         *
         * This maps the Brand Model to get an array of array with the COLUMNS that we want from the
         * HEADINGS.
         * This make sures that whatever is exported,
         * It can easily imported back, by using logic with headings
         *
         */
        $this->brands = Brand::all()->map(function ($brand) {
            return [
                $brand->id,
                $brand->name,
                $brand->company,
                $brand->website,
                $brand->description,
                $brand->status,

            ];
        });

        return $this->brands->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'company',
            'website',
            'description',
            'status',
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
        return 'Brands';
    }
}
