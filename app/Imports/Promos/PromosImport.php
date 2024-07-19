<?php

namespace App\Imports\Promos;

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
                    'start_date' => \Carbon\Carbon::parse($row['start_date']),
                    'end_date' => \Carbon\Carbon::parse($row['end_date']),
                ]
            );
        }
    }
}
