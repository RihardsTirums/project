<?php

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\CategoryResource;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ProfilePostController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Guest-only routes
|--------------------------------------------------------------------------
| These two can only be hit by guests (not yet authenticated)
*/

Route::middleware('guest')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::post('login',    [AuthenticatedSessionController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
| These require a valid Sanctum session
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::get('categories', fn() => CategoryResource::collection(Category::all()));
    Route::apiResource('posts', PostController::class);
    Route::apiResource('posts.comments', CommentController::class)->only(['store', 'destroy']);
    Route::get('profile/{user}', ProfilePostController::class);
});
