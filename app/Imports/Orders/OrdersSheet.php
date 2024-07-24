<?php

namespace App\Imports\Orders;

use App\Models\Order;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrdersSheet implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $user = User::find($row['user_id']);
            if (!$user) {
                continue;
            }

            $shippingAddress = $row['shipping_address'];
            if (!$shippingAddress) {
                $customer = Customer::where('user_id', $row['user_id'])->first();
                if ($customer) {
                    $shippingAddress = $customer->address;
                }
            }

            Order::updateOrCreate(
                ['id' => $row['id']],
                [
                    'user_id' => $row['user_id'],
                    'shipping_address' => $shippingAddress,
                    'status' => $row['status'],
                    'paid_date' => $row['paid_date']
                ]
            );
        }
    }
}
