<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\PostRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollection;

class PostController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Post::class, 'post');
    }

    /**
     * GET /api/posts
     *
     * @param  Request  $request
     * @return PostCollection
     */
    public function index(Request $request): PostCollection
    {
        $perPage = (int) $request->query('per_page', 20);

        $posts = Post::with(['user', 'categories'])
            ->withCount('comments')
            ->when(
                $search = $request->query('search'),
                fn($postQuery) => $postQuery->where(function ($q) use ($search) {
                    $q->where('title',   'ilike', "%{$search}%")
                        ->orWhere('content', 'ilike', "%{$search}%");
                })
            )
            ->when(
                $categories = $request->query('categories'),
                fn($postQuery) => $postQuery->whereHas(
                    'categories',
                    fn($categoryQuery) =>
                    $categoryQuery->whereIn(
                        'categories.id',
                        explode(',', $categories)
                    )
                )
            )
            ->latest()
            ->paginate($perPage);

        return new PostCollection($posts);
    }

    /**
     * POST /api/posts
     *
     * @param  PostRequest  $request
     * @return PostResource
     */
    public function store(PostRequest $request): PostResource
    {
        $data = $request->validated();

        $post = $request->user()->posts()->create([
            'title'   => $data['title'],
            'content' => $data['content'],
        ]);

        $post->categories()->sync($data['categories']);

        $post->load(['user', 'categories'])
            ->loadCount('comments');

        return new PostResource($post);
    }

    /**
     * GET /api/posts/{post}
     * 
     * @param  Post  $post
     * @return PostResource
     */
    public function show(Post $post): PostResource
    {
        $post->load(['user', 'categories'])
            ->loadCount('comments');

        return new PostResource($post);
    }

    /**
     * PUT/PATCH /api/posts/{post}
     *
     * @param  PostRequest  $request
     * @param  Post         $post
     * @return PostResource
     */
    public function update(PostRequest $request, Post $post): PostResource
    {
        $data = $request->validated();

        $post->update([
            'title'   => $data['title'],
            'content' => $data['content'],
        ]);

        $post->categories()->sync($data['categories']);

        $post->load(['user', 'categories'])
            ->loadCount('comments');

        return new PostResource($post);
    }

    /**
     * DELETE /api/posts/{post}
     *
     * @param  Post  $post
     * @return Response
     */
    public function destroy(Post $post): Response
    {
        $post->delete();

        return response()->noContent();
    }
}
