<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasFactory, SoftDeletes, Searchable;
    protected $with = [
        'stock',
        'images',
        // JUST LOAD THEM
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
    ];


    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $search = $filters['search'] ?? null;
        $search && $query->when($search, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('sku_code', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('specifications', 'like', '%' . $search . '%');
        });
    }
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
}
