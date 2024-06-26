<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stock extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_sku_code', 'sku_code');
    }
}
