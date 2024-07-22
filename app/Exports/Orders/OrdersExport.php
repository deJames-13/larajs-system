<?php

namespace App\Exports\Orders;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class OrdersExport implements WithMultipleSheets
{
    use Exportable;
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new OrdersSheet(),
            new OrderProductSheet(),
        ];
    }
}
