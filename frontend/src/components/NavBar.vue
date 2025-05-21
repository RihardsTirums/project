<template>
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <router-link to="/" class="flex items-center">
                    <span class="text-xl font-semibold text-gray-800">SocialPub</span>
                </router-link>

                <div class="flex items-center space-x-4">
                    <router-link v-if="!auth.user" to="/login"
                        class="text-gray-600 hover:text-gray-800">Login</router-link>
                    <router-link v-if="!auth.user" to="/register" class="text-gray-600 hover:text-gray-800">Sign
                        Up</router-link>

                    <router-link v-if="auth.user" to="/posts"
                        class="text-gray-600 hover:text-gray-800">Posts</router-link>
                    <router-link v-if="auth.user" to="/posts/create" class="text-gray-600 hover:text-gray-800">New
                        Post</router-link>
                    <router-link v-if="auth.user" to="/profile"
                        class="text-gray-600 hover:text-gray-800">Profile</router-link>

                    <div v-if="auth.user" class="flex items-center space-x-2 border-l border-gray-200 pl-4">
                        <span class="text-gray-700">Hey, {{ auth.user.name }}</span>
                        <button @click="auth.logout()"
                            class="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>