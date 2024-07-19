<?php

namespace App\Exports\Orders;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class OrdersSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $orders = [];

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $orders
         *
         * This maps the Order Model to get an array of arrays with the COLUMNS that we want from the
         * HEADINGS.
         * This ensures that whatever is exported,
         * It can easily be imported back, by using logic with headings
         *
         */
        $this->orders = Order::all()->map(function ($order) {
            return [
                $order->id,
                $order->user_id,
                $order->shipping_address,
                $order->status,
                $order->paid_date,
            ];
        });

        return $this->orders->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'user_id',
            'shipping_address',
            'status',
            'paid_date',
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
        return 'Orders';
    }
}
