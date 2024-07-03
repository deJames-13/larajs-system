<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Barryvdh\Debugbar\Facades\Debugbar;

class ChartController extends Controller
{

    /**
     * A function to get the total order per month in a year
     * @return JSON
     * [
     * {"month":1,"total":10},
     * {"month":2,"total":20},
     * ]
     */
    public function orderPerMonth()
    {
        if (request()->ajax()) {
            $orders = Order::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as total'))
                ->groupBy('month')
                ->get();

            Debugbar::info($orders);
            return response()->json($orders);
        }

        return view('admin.charts.order-per-month');
    }

    public function customerPerAddress()
    {
        if (request()->ajax()) {
            $customers = Customer::select('address', DB::raw('COUNT(*) as total'))
                ->groupBy('address')
                ->get();

            Debugbar::info($customers);
            return response()->json($customers);
        }

        return view('admin.charts.customer-per-address');
    }

    public function productsSold()
    {
        if (request()->ajax()) {
            $productsSold = DB::table('order_products')
                ->select('order_products.product_id', 'products.name', DB::raw('SUM(order_products.quantity) as total_sold'))
                ->join('products', 'order_products.product_id', '=', 'products.id')
                ->groupBy('order_products.product_id', 'products.name')
                ->get();

            return response()->json($productsSold);
        }

        return view('admin.charts.products-sold');
    }

    public function ordersRevenue()
    {
        if (request()->ajax()) {
            $revenues = DB::table('orders')
                ->join('order_products', 'orders.id', '=', 'order_products.order_id')
                ->join('products', 'order_products.product_id', '=', 'products.id')
                ->select(DB::raw('MONTH(orders.created_at) as month'), DB::raw('SUM(order_products.quantity * products.price) as revenue'))
                ->groupBy(DB::raw('MONTH(orders.created_at)'))
                ->get();

            return response()->json($revenues);
        }

        return view('admin.charts.orders-revenue');
    }

}
