<?php

namespace App\Imports;

use App\Models\Promos;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PromosImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            Promos::updateOrCreate(
                ['name' => $row['name']],
                [
                    'slug' => $row['slug'],
                    'description' => $row['description'],
                    'status' => $row['status'],
                    'discount' => $row['discount'],
                ]
            );
        }
    }
}
