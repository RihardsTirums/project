<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Category, Post, PostsResponse, PostFilters } from '@/types/post'
import { fetchCategories } from '@/services/category'
import { fetchPosts } from '@/services/post'
import { fetchUserPosts } from '@/services/profile'
import PostCard from './PostCard.vue'
import FilterBar from './FilterBar.vue'

const categories = ref<Category[]>([])
const postList = ref<Post[]>([])
const paginationMeta = ref<PostsResponse['data']['meta']>({} as any)
const loading = ref(true)
const error = ref<string | null>(null)
const props = defineProps<{ userId?: number }>()

const filters = ref<PostFilters>({
    search: '',
    categories: [],
    per_page: 9,
    page: 1,
});

const totalPages = computed(() => {
    return paginationMeta.value.last_page || 1
})

const heading = computed(
    () =>
        props.userId && postList.value.length
            ? `Posts by ${postList.value[0].user.name}`
            : 'All Posts'
)

onMounted(async () => {
    loading.value = true
    try {
        categories.value = await fetchCategories()
        await loadPosts(filters.value.page!)
    } catch (e: any) {
        error.value = e.message || 'Error loading data'
    } finally {
        loading.value = false
    }
})

async function loadPosts(page: number) {
    loading.value = true
    error.value = null
    filters.value.page = page

    try {
        const response: PostsResponse = props.userId
            ? await fetchUserPosts(props.userId, filters.value)
            : await fetchPosts(filters.value)

        postList.value = response.data.posts
        paginationMeta.value = response.data.meta
    } catch (e: any) {
        error.value = e.message || 'Error loading posts'
    } finally {
        loading.value = false
    }
}

function onFiltersChange(updated: PostFilters) {
    filters.value = { ...filters.value, ...updated, page: 1 }
    loadPosts(1)
}

function goToPage(page: number) {
    if (page < 1 || page > paginationMeta.value.last_page) return
    loadPosts(page)
}
</script>

<template>
    <div class="container mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold mb-6">{{ heading }}</h1>

        <FilterBar v-if="!props.userId" :categories="categories" :filters="filters" @update:filters="onFiltersChange" />

        <div v-if="loading" class="text-center py-8">Loading…</div>
        <div v-else-if="error" class="text-center text-red-600 py-8">
            {{ error }}
        </div>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PostCard v-for="post in postList" :key="post.id" :post="post" />
        </div>

        <nav v-if="paginationMeta.last_page > 1" class="mt-8">
            <div class="flex justify-center overflow-x-auto">
                <div class="inline-flex items-center space-x-2">
                    <button @click="goToPage(filters.page! - 1)" :disabled="filters.page === 1"
                        class="px-3 py-1 border rounded-l-md" :class="filters.page === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100'">
                        ‹ Prev
                    </button>

                    <ul class="inline-flex -space-x-px whitespace-nowrap">
                        <li v-for="n in totalPages" :key="n" class="hidden sm:inline-block">
                            <button @click="goToPage(n)" :class="[
                                'px-4 py-1 border',
                                n === filters.page
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            ]">
                                {{ n }}
                            </button>
                        </li>

                        <li class="sm:hidden">
                            <span class="px-4 py-1 border bg-white text-gray-700">
                                {{ filters.page }} of {{ totalPages }}
                            </span>
                        </li>
                    </ul>

                    <button @click="goToPage(filters.page! + 1)" :disabled="filters.page === paginationMeta.last_page"
                        class="px-3 py-1 border rounded-r-md" :class="filters.page === paginationMeta.last_page
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100'">
                        Next ›
                    </button>
                </div>
            </div>
        </nav>
    </div>
</template>