<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $main = parent::toArray($request);
        unset($main['password']);

        return [
            ...$main,
            'fullname' => $this->whenLoaded('info', fn () => $this->info->fullName()),
            'info' => $this->whenLoaded('info', fn () => new CustomerResource($this->info)),
            // calculate age based on birthdate
            'age' => $this->whenLoaded('info', fn () => $this->info->birthdate ? Carbon::parse($this->info->birthdate)->age : null),
            'images' => $this->whenLoaded('images', fn () => $this->images),

            'products' => $this->whenLoaded('products', fn () => $this->handleCart()),

            'created_at' => str_replace('T', ' ', explode('.', $this->created_at)[0]),
            'updated_at' => str_replace('T', ' ', explode('.', $this->updated_at)[0]),
        ];
    }



    private function handleCart()
    {
        $this->products->load(['promos', 'brands']);
        $promosData = [];
        $data = $this->products->map(function ($product) use (&$promosData) {
            foreach ($product->promos as $promo) {
                $promosData[$promo->id] = $promo->only(['id', 'name', 'discount', 'promo_type', 'promo_for', 'start_date', 'end_date']);
                $promosData[$promo->id]['product_id'] = $promo->pivot['product_id'];
            }
            return [
                'id' => $product->id,
                'name' => $product->name,
                'sku_code' => $product->sku_code,
                'brand' => optional($product->brands()->first())->name ?? 'No Brand',
                'price' => $product->price,
                'item_quantity' => $product->pivot['quantity'],
                'total' => $product->price * $product->pivot['quantity'],
                'images' => $product->images,
            ];
        });

        return [
            'data' => $data,
            'promos' => $promosData,

        ];
    }
}
