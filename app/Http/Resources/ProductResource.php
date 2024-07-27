<?php

namespace App\Http\Resources;

use Barryvdh\Debugbar\Facades\Debugbar;
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
        if ($this->stock->quantity == 0) {
            return [];
        }

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

                return $this->brands->filter(function ($brand) {
                    return $brand->status === 'active';
                });
            }),

            'categories' => $this->whenLoaded('categories', function () {
                return $this->categories->filter(function ($category) {
                    return $category->status === 'active';
                });
            }),

            'promos' => $this->whenLoaded('promos', function () {
                $data = $this->promos->filter(function ($promo) {
                    return ($promo->end_date !== null && $promo->end_date > now()) && $promo->status == 'active';
                });
                Debugbar::info($data);
                return $data;
            }),
            'ratings' => $this->getRatings(),

        ];
    }
}
