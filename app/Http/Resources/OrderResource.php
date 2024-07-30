<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProductResource;
use Barryvdh\Debugbar\Facades\Debugbar;
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
            'total' => $this->processedTotal()['total'],
            'discount' => $this->processedTotal()['discount'],
            'subtotal' => $this->processedTotal()['subtotal'],
            'promo' => $this->whenLoaded('promo', fn () => $this->promo),

        ];
    }

    private function processedTotal()
    {
        $this->load(['promo', 'products']);
        $total = 0;
        $subtotal = $this->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
        $shipping_cost = $this->shipping_cost;
        $promo = $this->promo;

        $data = $this->processDiscount($promo, $shipping_cost, $subtotal);

        return $data;
    }



    private function processDiscount($promo, $shipping, $subtotal)
    {
        $promo = optional($promo);

        $discount = $promo->discount ?? 0;
        $discountedSubtotal = $subtotal;
        $discountedShipping = $shipping;


        switch ($promo->promo_for) {
            case 'shipping':
                $discount = $promo->promo_type == 'percentage' ? ($shipping * $discount) / 100 : $discount;
                $discountedShipping -= $discount;
                break;

            case 'order':
                $discount = $promo->promo_type == 'percentage' ? ($discount * $subtotal) / 100 : $discount;
                $discountedSubtotal -= $discount;
                break;

            case 'product':
                $product = $this->products->filter(function ($product) use ($promo) {
                    return $product->id == $promo->product_id;
                });
                if (!isset($product[0])) return;
                $product = $product[0];
                $productTotal = $product * $product->pivot->quantity;
                $discount = $promo->promo_type == 'percentage' ? ($discount * $productTotal) / 100 : $discount;
                $discountedSubtotal -= $discount;
                break;

            default:
                break;
        }
        $total = $discountedSubtotal + $discountedShipping;

        return [
            'discount' => $discount,
            'discountedSubtotal' => $discountedSubtotal,
            'discountedShipping' => $discountedShipping,
            'total' => $total,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
        ];
    }
}
