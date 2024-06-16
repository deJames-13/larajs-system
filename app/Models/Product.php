<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
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

    public function promos()
    {
        return $this->belongsToMany(Promos::class, 'promo_products', 'product_id', 'promo_id');
    }
}
