<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'products' => ProductResource::collection($this->whenLoaded('products')),
            'customer' => new UserResource($this->whenLoaded('customer')),
            'subtotal' => $this->whenLoaded('products', function () {
                return $this->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
            }),
            'total' => $this->whenLoaded('products', function () {
                $subtotal = $this->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
                $shipping_cost = $this->shipping_cost;
                $total = $subtotal + $shipping_cost;
                return $total;

            }),
           'promo' => $this->whenLoaded('promo', fn() => new PromoResource($this->promo)),



        ];
    }

    private function getTotal()
    {
      $total = 0;
      $subtotal = $this->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
                $shipping_cost = $this->shipping_cost;
                $total = $subtotal + $shipping_cost;
      return $total;
    }


    private function getDiscountedTotal($promo, $shipping, $subtotal)
    {
       if (!optional($promo)->value) return 0;

       $discount = $promo->discount ?? 0;
       $discountedSubtotal = $subtotal;
       $discountedShipping = $shipping;



       $total = $discountedSubtotal + $discountedShipping;

       return $total;
    }



}
