<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollection;

class ProfilePostController extends Controller
{
    /**
     * GET /api/profile/{user}
     *
     * @param  Request  $request
     * @param  User     $user
     * @return PostCollection
     */
    public function __invoke(Request $request, User $user): PostCollection
    {
        $perPage = (int) $request->query('per_page', 9);

        $posts = $user->posts()
            ->with(['categories', 'user'])
            ->withCount('comments')
            ->latest()
            ->paginate($perPage);

        return new PostCollection($posts);
    }
}