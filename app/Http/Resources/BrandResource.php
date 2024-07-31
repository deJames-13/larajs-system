<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
{
    /** response()->json()
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // catgen, i, d
        return [
            ...parent::toArray($request),
            'images' => $this->images()->get(['id', 'name', 'path'])
        ];
    }
}
