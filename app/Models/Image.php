<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $fillable = [
        'name',
        'path',
    ];


    public function users()
    {
        return $this->belongsToMany(User::class, 'user_images', 'image_id', 'user_id');
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_images', 'image_id', 'product_id');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_images', 'image_id', 'category_id');
    }

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'brand_images', 'image_id', 'brand_id');
    }
    public function ratings()
    {
        return $this->belongsToMany(Rating::class, 'rating_images', 'image_id', 'rating_id');
    }
}
