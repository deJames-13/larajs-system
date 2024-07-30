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
            'subtotal' => $this->whenLoaded('products', function () {
                return $this->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
            }),
            'total' => $this->getTotal()->total ?? 0,
            'discount' => $this->getTotal()->discount ?? 0,
           'promo' => $this->whenLoaded('promo', fn() => $this->promo),



        ];
    }

    private function getTotal()
    {
      $this->load(['promo', 'products']);
      $total = 0;

      $subtotal = $this->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
                $shipping_cost = $this->shipping_cost;
                $total = $this->getDiscountedTotal($this->promo, $shipping_cost, $subtotal);

        return $total;
    }


    private function getDiscountedTotal($promo, $shipping, $subtotal)
    {
       if (!optional($promo)->id) return 0;
       $discount = $promo->discount ?? 0;
       $discountedSubtotal = $subtotal;
       $discountedShipping = $shipping;

       switch ($promo->promo_for) {
        case 'shipping':
            $discount = $promo->promo_type == 'percentage' ? ($shipping * $discount)/100 : $discount;
            $discountedShipping = $discountedShipping - $discount;

            break;
        case 'order':
            $discount = $promo->promo_type == 'percentage' ? ($discount*$subtotal)/100 : $discount;
            $discountedSubtotal = $subtotal - $discount;
            # code...
            break;
        case 'product':
            $product = $this->products->filter(function ($product) use ($promo) {
                return $product->id == $promo->product_id;
            });
            if (!isset($product[0])) return;
            $product = $product[0];
            // FIX
            $productTotal = $product * $product->pivot->quantity;
            $discount = $promo->promo_type == 'percentage' ? ($discount*$productTotal)/100 : $discount;
            $discountedSubtotal = $subtotal - $discount;
            # code...
            break;

        default:
            break;
       }
       Debugbar::info([$shipping,$discount,$discountedSubtotal,$discountedShipping]);

       $total = $discountedSubtotal + $discountedShipping;


       return (object)[
        'total' => $total,
        'discount' => $discount
       ];
    }



}
