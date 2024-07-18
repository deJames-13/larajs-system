<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = [];

    protected $table = 'stocks';

    protected $primaryKey = 'product_sku_code';

    protected $keyType = 'string';

    public $incrementing = false;

    // protected $fillable = ['product_sku_code', 'quantity'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_sku_code', 'sku_code');
    }
}
