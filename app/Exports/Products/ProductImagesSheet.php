<?php

namespace App\Exports\Products;

use App\Models\Product;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class ProductImagesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle, WithDrawings, WithEvents
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
            $images = $product->images;
            // if null dont return anything
            if (!$images) {
                return [];
            }

            return $images->map(function ($image) use ($product) {
                return [
                    'product_id' => $product->id,
                    'image_id' => $image->id,
                    'image_name' => $image->name,
                    'image_path' => $image->path,
                ];
            });
        });

        return $this->data->toArray();
    }

    public function drawings()
    {
        $drawings = [];

        foreach ($this->data as $key => $product) {
            $drawing = new Drawing();
            $drawing->setName($product['image_name']);
            $drawing->setPath(public_path($product['image_path']));
            $drawing->setHeight(200);
            $drawing->setCoordinates('E' . ($key + 2));

            $drawings[] = $drawing;
        }

        return $drawings;
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                foreach ($this->data as $key => $product) {
                    $event->sheet->getRowDimension($key + 2)->setRowHeight(200);
                }
            }
        ];
    }

    public function headings(): array
    {
        return [
            'product_id',
            'image_id',
            'image_name',
            'image_path',
            'image' // the actual image for drawing
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
        return 'ProductImages';
    }
}
