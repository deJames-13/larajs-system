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
}
