<script setup lang="ts">
import { defineProps } from 'vue'
import PostForm from '@/components/posts/PostForm.vue'

const props = defineProps<{ postId?: number }>()
const postId = props.postId
</script>

<template>
    <div class="container mx-auto px-4 py-6">
        <PostForm :postId="postId" />
    </div>
</template>