<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $primaryKey = 'order_id';
    public $incrementing = false;

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
