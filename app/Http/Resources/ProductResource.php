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
            'stock' => $this->stock->quantity ?? 0,
            'item_quantity' => $this->whenPivotLoaded('customer_products', function () {
                return $this->pivot->quantity;
            }),
            'order_quantity' => $this->whenPivotLoaded('order_products', function () {
                return $this->pivot->quantity;
            }),
            'images' => $this->whenLoaded('images', function () {
                return $this->images->makeHidden([''])->toArray();
            }),
            'brands' => $this->whenLoaded('brands', function () {
                return $this->brands->makeHidden([''])->toArray();
            }),
            'categories' => $this->whenLoaded('categories', function () {
                return $this->categories->makeHidden([''])->toArray();
            }),
            'promos' => $this->whenLoaded('promos', function () {
                return $this->promos->makeHidden([''])->toArray();
            }),
            'ratings' => $this->getRatings(),

        ];
    }
}
