<?php

namespace App\Exports\Products;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProductsExport implements WithMultipleSheets
{
    use Exportable;
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new ProductsSheet(),
            new ProductImagesSheet(),
            new ProductCategoriesSheet(),
            new ProductBrandSheet(),
        ];
    }
}
