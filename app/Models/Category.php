<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Schema;

class Category extends Model
{
    use HasFactory, SoftDeletes, Searchable;
    protected $guarded = [];

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'status',
    ];

    // Scope Filter
    public function scopeFilter($query, array $filters)
    {
        $columns = Schema::getColumnListing('categories');
        $search = $filters['search'] ?? "";
        $sort = $filters['sort'] ?? 'updated_at';
        $order = $filters['order'] ?? 'desc';

        $search && $query->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%')
                ->orWhere('slug', 'like', '%'.$search.'%')
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
        return $this->belongsToMany(Product::class, 'product_categories', 'category_id', 'product');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'category_images', 'category_id', 'image_id');
    }
}
