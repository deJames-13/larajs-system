<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $primaryKey = 'order_id';
    protected $with = [
        // 'order', // the ultimate broker
        'images'
    ];
    public $incrementing = false;

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'rating_images', 'rating_id', 'image_id');
    }
}
