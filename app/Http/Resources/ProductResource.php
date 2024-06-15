<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource // JSON
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Handles the json that will be sent
        return [
            // copies the column from products
            ...parent::toArray($request),

            // load relationships
            'stock' => $this->stock ?? 0,
            'item_quantity' => $this->whenPivotLoaded('customer_products', function () {
                return $this->pivot->quantity;
            }),
            'order_quantity' => $this->whenPivotLoaded('order_items', function () {
                return $this->pivot->quantity;
            }),
        ];
    }
}
