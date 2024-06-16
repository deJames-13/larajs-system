<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_categories', 'category_id', 'product');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'category_images', 'category_id', 'image_id');
    }
}
