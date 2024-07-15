<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),

            'created_at' => str_replace('T', ' ', explode('.', $this->created_at)[0]),
            'updated_at' => str_replace('T', ' ', explode('.', $this->updated_at)[0]),

        ];
    }
}
