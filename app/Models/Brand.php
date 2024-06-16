<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_brands', 'brand_id', 'product_id');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'brand_images', 'brand_id', 'image_id');
    }
}
