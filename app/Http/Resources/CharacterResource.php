<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Character
 * @package App\Http\Resources
 */
class CharacterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'health' => $this->health,
            'mana' => $this->mana,
            'position' => [
                'x' => $this->position_x,
                'y' => $this->position_y,
                'z' => $this->position_z,
            ],
            'rotation' => [
                'x' => $this->rotation_x,
                'y' => $this->rotation_y,
                'z' => $this->rotation_z,
            ]
        ];
    }
}
