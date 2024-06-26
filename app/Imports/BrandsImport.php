<?php

namespace App\Imports;

use App\Models\Brand;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BrandsImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            $item = Brand::create([
                'name' => $row['name'],
                'company' => $row['company'],
                'website' => $row['website'],
                'description' => $row['description'],
                'status' => $row['status'],
            ]);
        }
    }
}
