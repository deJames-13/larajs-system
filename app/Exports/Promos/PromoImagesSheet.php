<?php

namespace App\Exports\Promos;

use App\Models\Promos;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class PromoImagesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle, WithDrawings
{
    private $data;

    public function array(): array
    {
        $this->data = Promos::all()->flatMap(function ($promo) {
            $images = $promo->images;
            if (!$images) {
                return [];
            }

            return $images->map(function ($image) use ($promo) {
                return [
                    'promo_id' => $promo->id,
                    'image_id' => $image->id,
                    'image_name' => $image->name,
                    'image_path' => $image->path,
                ];
            });
        });

        return $this->data->toArray();
    }

    public function headings(): array
    {
        return [
            'promo_id',
            'image_id',
            'image_name',
            'image_path',
            'image' // Column for image drawing
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
        return 'PromoImages';
    }

    public function drawings()
    {
        $drawings = [];

        foreach ($this->data as $key => $promoImage) {
            $drawing = new Drawing();
            $drawing->setName($promoImage['image_name']);
            $drawing->setPath(public_path($promoImage['image_path']));
            $drawing->setHeight(200); // Adjust as needed
            $drawing->setCoordinates('E' . ($key + 2)); // Adjust column letter and row number as needed

            $drawings[] = $drawing;
        }

        return $drawings;
    }
}
