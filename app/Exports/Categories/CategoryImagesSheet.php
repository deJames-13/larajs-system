<?php

namespace App\Exports\Categories;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class CategoryImagesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle, WithDrawings
{
    private $data;

    public function array(): array
    {
        $this->data = Category::all()->flatMap(function ($category) {
            $images = $category->images;
            if (!$images) {
                return [];
            }

            return $images->map(function ($image) use ($category) {
                return [
                    'category_id' => $category->id,
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
            'category_id',
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
        return 'CategoryImages';
    }

    public function drawings()
    {
        $drawings = [];

        foreach ($this->data as $key => $categoryImage) {
            $drawing = new Drawing();
            $drawing->setName($categoryImage['image_name']);
            $drawing->setPath(public_path($categoryImage['image_path']));
            $drawing->setHeight(200); // Adjust as needed
            $drawing->setCoordinates('E' . ($key + 2)); // Adjust column letter and row number as needed

            $drawings[] = $drawing;
        }

        return $drawings;
    }
}
