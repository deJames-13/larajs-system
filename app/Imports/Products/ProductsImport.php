<?php

namespace App\Imports\Products;

use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProductsImport implements WithMultipleSheets, SkipsUnknownSheets
{

    public function sheets(): array
    {
        return [
            new ProductsSheet(),
            new ProductBrandSheet(),
            new ProductCategoriesSheet(),
        ];
    }
    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        Debugbar::info("Sheet {$sheetName} was skipped");
    }
}
