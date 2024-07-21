<?php

namespace App\Exports\Users;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class UserImagesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle, WithDrawings
{
    private $data;

    public function array(): array
    {
        $this->data = User::all()->flatMap(function ($user) {
            $images = $user->images;
            if (!$images) {
                return [];
            }

            return $images->map(function ($image) use ($user) {
                return [
                    'user_id' => $user->id,
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
            'user_id',
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
        return 'UserImages';
    }

    public function drawings()
    {
        $drawings = [];

        foreach ($this->data as $key => $userImage) {
            $drawing = new Drawing();
            $drawing->setName($userImage['image_name']);
            $drawing->setPath(public_path($userImage['image_path']));
            $drawing->setHeight(200); // Adjust as needed
            $drawing->setCoordinates('E' . ($key + 2)); // Adjust column letter and row number as needed

            $drawings[] = $drawing;
        }

        return $drawings;
    }
}
