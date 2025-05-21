<template>
    <div class="max-w-xl mx-auto text-center py-20">
        <h1 class="text-4xl font-bold mb-4">Welcome to SocialPub</h1>
        <p class="mb-2 text-gray-600">
            A place to share your thoughts, discover new ideas, and connect with friends.
        </p>
        <p class="mb-6 text-sm text-gray-500 italic">
            To use this website, you must be authenticated.
        </p>
        <div class="space-x-4">
            <router-link to="/login" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">Log In</router-link>
            <router-link to="/register" class="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">Sign Up</router-link>
        </div>
    </div>
</template>
