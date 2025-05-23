<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CategoryBadge from './CategoryBadge.vue';
import { fetchPost } from '@/services/post';
import type { Post, PostDetail } from '@/types/post';
import CommentsSection from './CommentsSection.vue';

const props = withDefaults(defineProps<{
    post?: Post;
    id?: number;
    expanded?: boolean;
}>(), { expanded: false });

const local = ref<Post | PostDetail | null>(props.post ?? null);
const loading = ref(!props.post);

onMounted(async () => {
    if (!local.value && props.id) {
        const response = await fetchPost(props.id as number)
        local.value = response.data
        loading.value = false
    }
});

const post = computed(() => local.value as Post);
</script>

<template>
    <div v-if="loading" class="py-8 text-center">Loading…</div>

    <component v-else :is="expanded ? 'article' : 'router-link'"
        v-bind="expanded ? {} : { to: { name: 'post.show', params: { id: post.id } } }"
        class="block bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out" :class="expanded
            ? 'p-8 max-w-3xl mx-auto hover:shadow-xl hover:ring-2 hover:ring-indigo-300'
            : 'p-4 hover:shadow-xl hover:scale-105 duration-200 flex flex-col justify-between no-underline'">

        <h1 :class="expanded ? 'text-3xl mb-4' : 'text-lg'" class="font-semibold text-gray-900">
            {{ post.title }}
        </h1>

        <div class="mt-1 flex items-center text-sm text-gray-500 space-x-2">
            <span>By <i>{{ post.user.name }}</i></span>
            <template v-if="expanded">
                <span>|</span>
                <time :datetime="post.created_at">{{ post.created_at }}</time>
            </template>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
            <CategoryBadge v-for="category in post.categories" :key="category.id" :category="category" />
        </div>

        <p v-if="!expanded" class="mt-3 text-gray-700">
            {{ post.content.slice(0, 200) }}…
        </p>
        <div v-else class="prose mt-6" v-html="post.content" />

        <footer v-if="!expanded" class="mt-3 text-xs text-gray-400 italic flex justify-between">
            <span>{{ post.comments_count }} comments</span>
            <span>Published {{ post.created_at }}</span>
        </footer>

        <CommentsSection v-if="expanded && 'comments' in post" :comments="(post as PostDetail).comments" />
    </component>
</template>
