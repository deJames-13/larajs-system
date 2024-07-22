<?php

namespace App\Imports\Brands;

use App\Models\Brand;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BrandsSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            Brand::updateOrCreate(
                ['name' => $row['name']],
                [
                    'company' => $row['company'],
                    'website' => $row['website'],
                    'description' => $row['description'],
                    'status' => $row['status'],
                ]
            );
        }
    }
}
