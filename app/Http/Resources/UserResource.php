<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
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

            'created_at' => str_replace('T', ' ', explode('.', $this->created_at)[0]),
            'updated_at' => str_replace('T', ' ', explode('.', $this->updated_at)[0]),
        ];
    }
}
