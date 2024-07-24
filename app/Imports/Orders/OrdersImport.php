<?php

namespace App\Imports\Orders;

use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class OrdersImport implements WithMultipleSheets, SkipsUnknownSheets
{

    public function sheets(): array
    {
        return [
            new OrdersSheet(),
            new OrderProductsSheet(),
        ];
    }
    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        Debugbar::info("Sheet {$sheetName} was skipped");
    }
}
