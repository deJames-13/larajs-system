<?php

namespace App\Models;

use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Schema;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasFactory, Searchable, SoftDeletes;

    protected $with = [
        // 'stock',
        // 'images',
        // 'categories',
        // 'brands',
        // 'promos',
    ];

    protected $fillable = [
        'name',
        'sku_code',
        'description',
        'specifications',
        'price',
        'status',
    ];

    public function customers()
    {
        return $this->belongsToMany(User::class, 'customer_products')->withPivot('quantity');
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_products')->withPivot('quantity');
    }

    public function stock()
    {
        return $this->hasOne(Stock::class, 'product_sku_code', 'sku_code');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories', 'product_id', 'category_id');
    }

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'product_brands', 'product_id', 'brand_id');
    }

    public function promos()
    {
        return $this->belongsToMany(Promos::class, 'promo_products', 'product_id', 'promo_id');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'product_images', 'product_id', 'image_id');
    }


    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $columns = Schema::getColumnListing('products');
        $search = $filters['search'] ?? "";
        $sort = $filters['sort'] ?? 'updated_at';
        $order = $filters['order'] ?? 'desc';

        $search && $query->when($search, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('sku_code', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('specifications', 'like', '%' . $search . '%');
        });

        // dont
        // $query->whereHas('stock', function ($query) {
        //     $query->where('quantity', '>', 0);
        // });

        switch ($sort) {
            case 'oldest':
                $query->oldest();
                break;

            case 'newest':
                $query->latest();
                break;

            case 'lowest-price':
                $query->orderBy('price', 'asc');
                break;

            case 'highest-price':
                $query->orderBy('price', 'desc');
                break;

            case 'stock':
                $query->join('stocks', 'products.sku_code', '=', 'stocks.product_sku_code')
                    ->orderBy('stocks.quantity', $order);
                break;

            case 'brand-name':
                $query->join('product_brands', 'products.id', '=', 'product_brands.product_id')
                    ->join('brands', 'product_brands.brand_id', '=', 'brands.id')
                    ->selectRaw('products.id, products.name, products.price, brands.name as brand_name')
                    ->groupBy('products.id', 'products.name', 'products.price', 'brand_name')
                    ->orderBy('brand_name', $order);
                break;

            case 'top-rated':
                $query->join('order_products', 'products.id', '=', 'order_products.product_id')
                    ->join('orders', 'order_products.order_id', '=', 'orders.id')
                    ->join('ratings', 'orders.id', '=', 'ratings.order_id')
                    ->selectRaw('products.id, products.name, products.price, avg(ratings.rating) as avg_rating')
                    ->groupBy('products.id', 'products.name', 'products.price')
                    ->orderBy('avg_rating', $order);
                break;


            default:
                if (!in_array($sort, $columns)) $sort = 'updated_at';
                $query->orderBy($sort, $order);
                break;
        }

        Debugbar::info($query->toSql());
    }



    public function getRatings()
    {
        $orders = $this->orders()->with(['customer', 'products', 'rating'])->get();
        $ratings = $orders->map(function ($order) {
            $username = $order->customer->username;
            $rating = $order->rating;
            if ($rating === null) return null;
            if (!$rating->is_show_user) $username = 'Anonymous';
            return (object)[
                ...$rating->toArray(),
                'username' => $username,
                'rating' => $rating->rating,
            ];
        })->filter(function ($rating) {
            return $rating !== null;
        });

        $count = $ratings->count();
        $average = $ratings->average('rating');
        $highest = $ratings->max('rating');
        $lowest = $ratings->min('rating');

        return (object)[
            'data' => $ratings,
            'count' => $count,
            'average' => $average,
            'highest' => $highest,
            'lowest' => $lowest,
        ];
    }
}
