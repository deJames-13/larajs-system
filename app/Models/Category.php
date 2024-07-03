<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('status', 'like', '%' . $search . '%');
        });
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
