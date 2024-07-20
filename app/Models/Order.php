<?php

namespace App\Models;

use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{

    use HasFactory, SoftDeletes;
    // protected $with = ['customer', 'products'];
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products')->withPivot('quantity');
    }

    public function scopeFilter($query, array $filters)
    {
        Debugbar::info($filters);
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('id', 'like', '%' . $search . '%')
                ->orWhere('shipping_address', 'like', '%' . $search . '%')
                ->orWhere('status', 'like', '%' . $search . '%')
                // customer relationship filter
                ->orWhereHas('customer', function ($query) use ($search) {
                    $query->where('username', 'like', '%' . $search . '%');
                    $query->orWhere('email', 'like', '%' . $search . '%');
                    // info relationship filter
                    $query->orWhereHas('info', function ($query) use ($search) {
                        $query->where('first_name', 'like', '%' . $search . '%');
                        $query->orWhere('last_name', 'like', '%' . $search . '%');
                    });
                })
                // products relationship filter
                ->orWhereHas('products', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                });
        });
    }

    public static function getMonthlyRevenue($year, $month)
    {
        $order = Order::where('status', 'completed')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month);

        // products from completed orders with total as product price * quantity
        $total = $order->get()->map(function ($order) {
            return $order->products->map(function ($product) {
                return $product->price * $product->pivot->quantity;
            })->sum();
        })->sum();

        return (object)[
            "total" => $total,
            "count" => $order->count()
        ];
    }



    // MetaDatas
    public static function metadata($year = null, $month = null)
    {
        $order = Order::where('status', 'completed');
        // products from completed orders with total as product price * quantity
        $total = $order->get()->map(function ($order) {
            return $order->products->map(function ($product) {
                return $product->price * $product->pivot->quantity;
            })->sum();
        })->sum();

        $year = $year ?? now()->year;
        $month = $month ?? now()->month;

        $monthly = Order::getMonthlyRevenue($year, $month);
        $monthlyEarned = $monthly->total;
        $monthlyOrdersCount = $monthly->count;


        return [
            "totalEarned" => $total,
            "customerCount" => User::where('role', 'customer')->count(),
            "ordersCount" => Order::count(),
            "pendingOrders" => Order::where('status', 'pending')->count(),
            "completedOrders" => Order::where('status', 'completed')->count(),
            "shippingOrders" => Order::where('status', 'shipping')->count(),
            "productsCount" => Product::count(),
            "monthlyEarned" => $monthlyEarned,
            "monthlyOrdersCount" => $monthlyOrdersCount,

        ];
    }
}
