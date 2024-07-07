<?php

namespace App\Imports;

use App\Models\Order;
use App\Models\Product;
use App\Models\Stock;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrdersImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Check if user_id exists in the users table
            $user = User::find($row['user_id']);
            if (!$user) {
                // Skip the row if user_id does not exist
                continue;
            }

            // Determine shipping address
            $shippingAddress = $row['shipping_address'];
            if (!$shippingAddress) {
                $customer = Customer::where('user_id', $row['user_id'])->first();
                if ($customer) {
                    $shippingAddress = $customer->address;
                }
            }

            // Create the order
            $order = Order::create([
                'user_id' => $row['user_id'],
                'shipping_address' => $shippingAddress,
                'status' => $row['status'],
                'paid_date' => $row['paid_date']
            ]);

            // Check if product_id exists in the products table
            $product = Product::find($row['product_id']);
            if (!$product) {
                // Skip the row if product_id does not exist
                continue;
            }

            // Insert the order product entry into the order_products table
            DB::table('order_products')->insert([
                'order_id' => $order->id,
                'product_id' => $row['product_id'],
                'quantity' => $row['quantity']
            ]);

            // Deduct the quantity from the stocks table
            $stock = Stock::where('product_sku_code', $product->sku_code)->first();
            if ($stock) {
                $stock->quantity -= $row['quantity'];
                $stock->save();
            }
        }
    }
}
