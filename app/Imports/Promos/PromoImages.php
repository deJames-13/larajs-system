<?php

namespace App\Imports\Promos;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class PromoImages implements ToCollection
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
