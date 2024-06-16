<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function fullName(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    // Relationship
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
