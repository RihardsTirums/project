<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'title'           => $this->title,
            'content'         => $this->content,
            'created_at'      => $this->created_at->format('d.m.Y H:i:s'),
            'user'            => [
                'id'   => $this->user->id,
                'name' => $this->user->name,
            ],
            'categories'      => $this->categories
                ->map(fn($c) => [
                    'id'   => $c->id,
                    'name' => $c->name,
                ])
                ->values(),
            'comments_count'  => $this->comments_count,
            'comments'       => CommentResource::collection(
                $this->whenLoaded('comments')
            ),
        ];
    }
}
