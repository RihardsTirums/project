<script setup lang="ts">
import PostGrid from '@/components/posts/PostGrid.vue'
const props = defineProps<{ id: number }>()
</script>

<template>
    <div class="container mx-auto px-4 py-6">
        <PostGrid :userId="id" :key="props.id" />
    </div>
</template>
