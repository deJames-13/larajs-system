<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Illuminate\Support\Facades\Schema;

class Brand extends Model
{
    use HasFactory, Searchable, SoftDeletes;

    protected $guarded = [];

    protected $fillable = [
        'name',
        'company',
        'website',
        'description',
        'logo',
        'status',
    ];

    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $columns = Schema::getColumnListing('brands');
        $search = $filters['search'] ?? "";
        $sort = $filters['sort'] ?? 'updated_at';
        $order = $filters['order'] ?? 'desc';

        $search && $query->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%')
                ->orWhere('company', 'like', '%'.$search.'%')
                ->orWhere('website', 'like', '%'.$search.'%')
                ->orWhere('description', 'like', '%'.$search.'%')
                ->orWhere('status', 'like', '%'.$search.'%');
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
        return $this->belongsToMany(Product::class, 'product_brands', 'brand_id', 'product_id');
    }

    public function images()
    {
        return $this->belongsToMany(Image::class, 'brand_images', 'brand_id', 'image_id');
    }
}
