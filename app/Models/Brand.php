<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model
{
    use HasFactory, SoftDeletes, Searchable;
    protected $guarded = [];

    protected $fillable = [
        'name',
        'company',
        'website',
        'description',
        'logo',
        'status',
    ];

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('company', 'like', '%' . $search . '%')
                ->orWhere('website', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('status', 'like', '%' . $search . '%');
        });
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
