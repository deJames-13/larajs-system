<?php

namespace App\Exports\Brands;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class BrandsExport implements WithMultipleSheets
{
    use Exportable;
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new BrandsSheet(),
            new BrandImagesSheet(),
        ];
    }
}
