<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const open = ref(false)
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <router-link to="/" class="flex items-center">
          <span class="text-xl font-semibold text-gray-800">SocialPub</span>
        </router-link>

        <button @click="open = !open"
          class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg v-if="!open" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="hidden sm:flex items-center space-x-4">
          <router-link v-if="!auth.user" to="/login" class="text-gray-600 hover:text-gray-800">
            Login
          </router-link>
          <router-link v-if="!auth.user" to="/register" class="text-gray-600 hover:text-gray-800">
            Sign Up
          </router-link>

          <router-link v-if="auth.user" to="/posts" class="text-gray-600 hover:text-gray-800">
            Posts
          </router-link>
          <router-link v-if="auth.user" :to="{ name: 'posts.form' }" class="text-gray-600 hover:text-gray-800">
            New Post
          </router-link>

          <div v-if="auth.user" class="flex items-center space-x-2 border-l border-gray-200 pl-4">
            <span class="text-gray-700">Hey, {{ auth.user.name }}</span>
            <button @click="auth.logout()" class="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div v-show="open" class="sm:hidden mt-2 space-y-1 pb-4">
        <router-link v-if="!auth.user" to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">
          Login
        </router-link>
        <router-link v-if="!auth.user" to="/register"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">
          Sign Up
        </router-link>

        <router-link v-if="auth.user" to="/posts"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">
          Posts
        </router-link>
        <router-link v-if="auth.user" :to="{ name: 'posts.form' }"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">
          New Post
        </router-link>

        <div v-if="auth.user" class="border-t border-gray-200 pt-4 px-3">
          <span class="block text-gray-700 mb-2">Hey, {{ auth.user.name }}</span>
          <button @click="auth.logout()"
            class="w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:text-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>