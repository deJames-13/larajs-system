<?php

namespace App\Imports\Brands;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class BrandImages implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
        }
    }
}
