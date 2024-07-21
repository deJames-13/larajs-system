<?php

namespace App\Exports\Brands;

use App\Models\Brand;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class BrandImagesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle, WithDrawings
{
    private $data;

    public function array(): array
    {
        $this->data = Brand::all()->flatMap(function ($brand) {
            $images = $brand->images;
            if (!$images) {
                return [];
            }

            return $images->map(function ($image) use ($brand) {
                return [
                    'brand_id' => $brand->id,
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
            'brand_id',
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
        return 'BrandImages';
    }

    public function drawings()
    {
        $drawings = [];

        foreach ($this->data as $key => $brandImage) {
            $drawing = new Drawing();
            $drawing->setName($brandImage['image_name']);
            $drawing->setPath(public_path($brandImage['image_path']));
            $drawing->setHeight(200); // Adjust as needed
            $drawing->setCoordinates('E' . ($key + 2)); // Adjust column letter and row number as needed

            $drawings[] = $drawing;
        }

        return $drawings;
    }
}
