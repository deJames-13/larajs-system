<?php

namespace App\Imports\Products;

use Illuminate\Support\Collection;
use Barryvdh\Debugbar\Facades\Debugbar;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductImagesSheet implements WithEvents
{
    public function registerEvents(): array
    {
        return [];
    }
}
