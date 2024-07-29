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
        // lol
        // if ($this->stock->quantity == 0) {
        //     return [];
        // }

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
                return $this->images->makeHidden(['pivot'])->toArray();
            }),
            'brands' => $this->whenLoaded('brands', function () {
                $data = $this->brands->filter(function ($brand) {
                    return $brand->status === 'active';
                });
                return $data->makeHidden(['pivot'])->toArray();
            }),

            'categories' => $this->whenLoaded('categories', function () {
                $data = $this->categories->filter(function ($category) {
                    return $category->status === 'active';
                });
                return $data->makeHidden(['pivot'])->toArray();
            }),

            'promos' => $this->whenLoaded('promos', function () {
                $data = $this->promos->filter(function ($promo) {

                    return $promo->status === 'active' &&
                        $promo->start_date <= now() &&
                        $promo->end_date >= now() &&
                        $promo->promo_type !== null &&
                        $promo->promo_for !== null &&
                        $promo->start_date !== null &&
                        $promo->end_date !== null;
                });
                Debugbar::info($data);
                return $data->makeHidden(['pivot'])->toArray();
            }),
            'ratings' => $this->getRatings(),

        ];
    }
}
