<?php

namespace App\Exports\Promos;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class PromosExport implements WithMultipleSheets
{
    use Exportable;
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new PromosSheet(),
            new PromoImagesSheet(),
            new PromoProductSheet(),

        ];
    }
}
