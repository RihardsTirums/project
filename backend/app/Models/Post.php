<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    BelongsToMany,
    HasMany
};
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $content
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'content'];

    /**
     * The user of the post.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The categories this post belongs to.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Comments written on this post, sorted newest-first, each with its author loaded.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)
                    ->with('user')
                    ->orderBy('created_at', 'desc');
    }
}
