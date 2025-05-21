<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Technology',
            'Health & Wellness',
            'Lifestyle',
            'Business & Finance',
            'Travel',
            'Food & Recipes',
            'Parenting',
            'Fitness',
            'Education',
            'Entertainment',
            'Gaming',
            'Music',
            'Movies & TV',
            'Books & Literature',
            'Personal Development',
            'Fashion & Style',
            'Relationships',
            'Home & Garden',
            'DIY & Crafts',
            'Career & Productivity',
            'Startups',
            'Crypto & Blockchain',
            'AI & Machine Learning',
            'Remote Work',
            'Mental Health',
            'Sustainability',
            'Minimalism',
            'Self-Care',
            'Digital Nomad Life',
            'Pet Care',
            'Jiu-Jitsu',
            'MMA & Combat Sports',
            'Gi vs No-Gi',
            'BJJ for Beginners',
            'BJJ Competition Prep',
            'Martial Arts Philosophy',
            'Strength & Mobility for Fighters',
            'Injury Rehab & Recovery',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(['name' => $name]);
        }
    }
}
