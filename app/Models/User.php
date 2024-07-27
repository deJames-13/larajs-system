<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens, SoftDeletes;

    protected $with = [
        // 'info',
        // 'images'
    ];

    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'status'
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $columns = Schema::getColumnListing('products');
        $search = $filters['search'] ?? "";
        $sort = $filters['sort'] ?? 'updated_at';
        $order = $filters['order'] ?? 'desc';

        $query->when($search ?? null, function ($query, $search) {
            $query->where(
                fn ($query) =>
                $query->where('username', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    // role
                    ->orWhere('role', 'like', '%' . $search . '%')
                    // id
                    ->orWhere('id', 'like', '%' . $search . '%')
            );
        });

        switch ($sort) {
            case 'oldest':
                $sort = 'created_at';
                $order = 'asc';
                break;
            case 'newest':
                $sort = 'created_at';
                break;
            default:
                if (!in_array($sort, $columns))
                    $sort = 'updated_at';
        }


        $query->orderBy($sort, $order);
    }

    // Relationships

    // 1 : 1
    // customer 
    public function info()
    {
        return $this->hasOne(Customer::class, 'user_id', 'id');
    }


    // N : n
    public function products()
    {
        return $this->belongsToMany(Product::class, 'customer_products')->withPivot('quantity');
    }

    // 1 : n
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function orderPerStatus()
    {
        // returns 
        /* 
        [
            'pending' => 2,
            'processing' => 1,
            'completed' => 3,
            'cancelled' => 1
        ];
        */

        return $this->orders()->selectRaw('status, count(*) as count')->groupBy('status')->pluck('count', 'status');
    }


    // images
    public function images()
    {
        return $this->belongsToMany(Image::class, 'user_images', 'user_id', 'image_id');
    }


    public function getCart()
    {
        // return user products count and total price (price * quantity)
        $products = $this->products;
        $count = $products->map(function ($product) {
            return $product->pivot->quantity;
        })->sum();
        $total = $products->sum(function ($product) {
            return $product->price * $product->pivot->quantity;
        });

        return (object)[
            'count' => $count,
            'total' => $total,
            'products' => $products
        ];
    }
}
