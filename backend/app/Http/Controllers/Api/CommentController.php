<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Http\Requests\StoreCommentRequest;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Comment::class, 'comment');
    }

    /**
     * POST /api/posts/{post}/comments
     *
     * @param  StoreCommentRequest  $request
     * @param  Post                 $post
     * @return CommentResource
     */
    public function store(StoreCommentRequest $request, Post $post): CommentResource
    {
        $comment = $post->comments()->create([
            'content' => $request->validated()['content'],
            'user_id' => $request->user()->id,
        ]);

        $comment->load('user');

        return new CommentResource($comment);
    }

    /**
     * DELETE /api/posts/{post}/comments/{comment}
     *
     * @param  Comment  $comment
     * @return Response
     */
    public function destroy(Comment $comment): Response
    {
        $comment->delete();

        return response()->noContent();
    }
}
