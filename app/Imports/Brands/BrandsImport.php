<?php

namespace App\Imports\Brands;

use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class BrandsImport implements WithMultipleSheets, SkipsUnknownSheets
{

    public function sheets(): array
    {
        return [
            new BrandsSheet(),
            new BrandImages(),

        ];
    }
    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        Debugbar::info("Sheet {$sheetName} was skipped");
    }
}
