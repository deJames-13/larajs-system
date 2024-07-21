<?php

namespace App\Exports\Categories;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CategoriesExport implements WithMultipleSheets
{
    use Exportable;
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new CategoriesSheet(),
            new CategoryImagesSheet(),
        ];
    }
}
