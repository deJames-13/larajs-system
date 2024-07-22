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
        'stock',
        'images',
        // JUST LOAD THEM
        'categories',
        'brands',
        'promos',
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

        if ($sort === 'oldest') {
            $query->orderBy('created_at', "asc");
        } else if ($sort === 'latest') {
            $query->orderBy('created_at', "desc");
        } else if ($sort === 'stock') {
            $query->join('stocks', 'products.sku_code', '=', 'stocks.product_sku_code')
                ->select('products.*', 'stocks.quantity')
                ->orderBy('quantity', $order);
        } else if (!in_array($sort, $columns)) $sort = 'updated_at';
        else $query->orderBy($sort, $order);

        // Debugbar::info($query->toSql());
    }
}
