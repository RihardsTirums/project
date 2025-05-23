<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '@/types/post'

const props = defineProps<{ category: Category }>()

const palette = [
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-red-200 text-red-800',
    'bg-purple-200 text-purple-800',
    'bg-yellow-200 text-yellow-800',
    'bg-indigo-200 text-indigo-800',
    'bg-pink-200 text-pink-800',
    'bg-teal-200 text-teal-800',
    'bg-gray-200 text-gray-800',
]

const colorClasses = computed(
    () => palette[props.category.id % palette.length]
)
</script>

<template>
    <span class="text-xs font-medium rounded-full px-2 py-1" :class="colorClasses">
        {{ category.name }}
    </span>
</template>