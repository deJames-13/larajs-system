<?php

namespace App\Imports\Orders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrderProductsSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $orderExists = Order::find($row['order_id']);
            if (!$orderExists) {
                continue;
            }

            $productExists = Product::find($row['product_id']);
            if (!$productExists) {
                continue;
            }

            DB::table('order_products')->updateOrInsert(
                [
                    'order_id' => $row['order_id'],
                    'product_id' => $row['product_id']
                ],
                ['quantity' => $row['quantity']]
            );
        }
    }
}
