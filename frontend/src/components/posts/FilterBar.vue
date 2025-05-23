<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import type { Category, PostFilters } from '@/types/post';
import CategoryBadge from './CategoryBadge.vue';

const props = defineProps<{
    categories: Category[];
    filters: PostFilters;
}>();

const emit = defineEmits<{
    (e: 'update:filters', f: PostFilters): void;
}>();

const open = ref(false);

const local = reactive<PostFilters>({
    search: props.filters.search,
    categories: [...props.filters.categories],
    per_page: props.filters.per_page,
    page: props.filters.page,
});

function emitUpdate() {
    emit('update:filters', {
        search: local.search.trim(),
        categories: local.categories,
        per_page: props.filters.per_page,
        page: props.filters.page,
    });
}

function clearFilters() {
    local.search = '';
    local.categories = [];
    emit('update:filters', {
        search: '',
        categories: [],
        per_page: props.filters.per_page,
        page: props.filters.page,
    });
    open.value = false;
}

watch(
    () => props.filters,
    (f) => {
        local.search = f.search ?? '';
        local.categories = [...(f.categories ?? [])];
    }
);
</script>

<template>
    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input v-model="local.search" @input="emitUpdate" type="text" placeholder="Search posts…"
            class="flex-1 p-2 border rounded focus:outline-none" />

        <div class="relative">
            <button @click="open = !open" class="px-4 py-2 border rounded bg-white flex items-center gap-2">
                <span>Categories</span>
                <svg class="w-4 h-4" viewBox="0 0 20 20">
                    <path d="M5 8l5 5 5-5H5z" />
                </svg>
            </button>

            <div v-if="open" class="fixed inset-0 bg-transparent" @click="open = false"></div>

            <div v-if="open"
                class="absolute mt-2 w-48 max-h-60 overflow-auto bg-white border rounded shadow-lg p-2 z-20">
                <label v-for="category in categories" :key="category.id" class="flex items-center mb-1 cursor-pointer">
                    <input type="checkbox" :value="category.id" v-model="local.categories" @change="emitUpdate"
                        class="mr-2" />
                    <CategoryBadge :category="category" />
                </label>
            </div>
        </div>

        <button @click="clearFilters" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            Clear All
        </button>
    </div>
</template>
