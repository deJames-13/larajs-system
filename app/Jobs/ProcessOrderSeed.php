<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProcessOrderSeed implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $this->createOrder(1000, random: true);
    }
    public function createOrder($count, $status = 'completed', $random = false)
    {
        $statuses = ['pending', 'processing', 'shipping', 'completed', 'cancelled'];

        for ($i = 0; $i < $count; $i++) {

            // random status
            if ($random) {
                $status = $statuses[array_rand($statuses)];
            }

            DB::transaction(function () use ($status) {

                $created_at = now()->subDays(rand(30, 365));
                $updated_at = $status === 'completed' ? $created_at->addDays(7) : $created_at;
                $paid_date = $status === 'completed' ? $updated_at : null;

                $customer = User::inRandomOrder()->first();
                $product = Product::inRandomOrder()->first();
                if (!$customer || !$product) {
                    return;
                }
                $order = $customer->orders()->create([
                    'status' => $status,
                    'shipping_address' => $customer->info->address,
                    'created_at' => $created_at,
                    'updated_at' => $updated_at,
                    'paid_date' => $paid_date,
                ]);

                $order->products()->attach(
                    $product->id,
                    ['quantity' => rand(1, 5),]
                );

                // Log Message: (color blue)[Order Created] Order ID: 1, Customer ID: 1, Product ID: 1, Quantity: 1, Status: completed, Paid Date: 2021-09-01 00:00:00, Created At: 2021-08-01 00:00:00, Updated At: 2021-08-08 00:00:00

                // status ansi color. pending: yellow, cancelled: red, completed green, default: blue
                switch ($status) {
                    case 'pending':
                        $status = "\033[33m$status\033[0m";
                        break;
                    case 'cancelled':
                        $status = "\033[31m$status\033[0m";
                        break;
                    case 'completed':
                        $status = "\033[32m$status\033[0m";
                        break;
                    default:
                        $status = "\033[34m$status\033[0m";
                        break;
                }



                $this->info(
                    sprintf(
                        "\033[34m[Order Created]\033[0m \n\033[93mOrder ID: %d\033[0m, \n\033[96mCustomer ID: %d\033[0m, \n\033[94mProduct ID: %d\033[0m, \nQuantity: %d, \nStatus: %s, \n\033[92mPaid Date: %s\033[0m, \n\033[94mCreated At: %s\033[0m, \n\033[96mUpdated At: %s\033[0m",
                        $order->id,
                        $customer->id,
                        $product->id,
                        $order->products->first()->pivot->quantity,
                        $status,
                        $paid_date ? $paid_date->format('F j, Y') : 'TBC',
                        $created_at->format('F j, Y'),
                        $updated_at->format('F j, Y')
                    )
                );
            });
        }
    }

    public function info($message)
    {
        echo "##############################################\n";
        echo "$message\n" . PHP_EOL;
        echo "##############################################\n";
    }
}
