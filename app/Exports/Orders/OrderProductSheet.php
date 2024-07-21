<?php

namespace App\Exports\Orders;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class OrderProductSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $data;

    public function array(): array
    {
        /**
         * Retrieves data directly from the `order_products` table.
         */
        $this->data = DB::table('order_products')->get()->map(function ($orderProduct) {
            return [
                $orderProduct->id,
                $orderProduct->order_id,
                $orderProduct->product_id,
                $orderProduct->quantity,
            ];
        });

        return $this->data->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'order_id',
            'product_id',
            'quantity',
        ];
    }

    public function getCsvSettings(): array
    {
        return [
            'writer' => 'stream',
            'heading_row' => 1,
            'cache_size' => 1000,
            'pre_calculate_formulas' => false,
        ];
    }

    public function title(): string
    {
        return 'OrderProduct';
    }
}
