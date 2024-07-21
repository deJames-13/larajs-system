<?php

namespace App\Imports\Categories;

use App\Models\Category;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CategoriesSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            Category::updateOrCreate(
                ['name' => $row['name']],
                [
                    'slug' => $row['slug'],
                    'description' => $row['description'],
                    'status' => $row['status'],
                ]
            );
        }
    }
}
