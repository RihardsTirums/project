<script setup lang="ts">
import type { Comment } from '@/types/post';

const props = defineProps<{
    comments: Comment[];
}>();
</script>

<template>
    <section class="mt-8">
        <h2 class="text-lg font-semibold mb-4">
            Comments ({{ comments.length }})
        </h2>
        <div v-for="comment in comments" :key="comment.id" class="mb-4 p-4 bg-gray-50 rounded">
            <p class="text-sm text-gray-800">{{ comment.content }}</p>
            <footer class="mt-2 text-xs text-gray-500">
                — {{ comment.user.name }}, {{ comment.created_at }}
            </footer>
        </div>
    </section>
</template>