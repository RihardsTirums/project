<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call(CategorySeeder::class);

        User::factory(5)->create();

        User::all()->each(function($user) {
            Post::factory(rand(1,20))
                ->for($user, 'user')
                ->create()
                ->each(function($post) {
                    $post->categories()->attach(
                        \App\Models\Category::inRandomOrder()->take(rand(1,8))->pluck('id')
                    );

                    Comment::factory(rand(0,150))
                        ->for($post, 'post')
                        ->create();
                });
        });
    }
}
