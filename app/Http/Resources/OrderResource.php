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
                return $subtotal + $shipping_cost;
            }),



        ];
    }
}
