<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Schema;

class Promos extends Model
{

    use HasFactory, SoftDeletes, Searchable;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'status',
        'discount',
        'start_date',
        'end_date',
    ];

    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $columns = Schema::getColumnListing('promos');
        $search = $filters['search'] ?? "";
        $sort = $filters['sort'] ?? 'updated_at';
        $order = $filters['order'] ?? 'desc';

        $search && $query->when($search, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('slug', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('status', 'like', '%' . $search . '%')
                ->orWhere('discount', 'like', '%' . $search . '%')
                ->orWhere('start_date', 'like', '%' . $search . '%')
                ->orWhere('end_date', 'like', '%' . $search . '%');
        });

        if ($sort === 'created_at_oldest') {
            $sort = 'created_at';
            $order = 'asc';
        } elseif (!in_array($sort, $columns)) {
            $sort = 'updated_at';
        }

        $query->orderBy($sort, $order);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'promo_products', 'promo_id', 'product_id');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'promo_images', 'promo_id', 'image_id');
    }
}
