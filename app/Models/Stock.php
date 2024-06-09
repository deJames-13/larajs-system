<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Item::class, 'product_sku_code', 'sku_code');
    }
}
