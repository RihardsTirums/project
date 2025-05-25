<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Category, PostPayload, PostResponse } from '@/types/post'
import CategoryBadge from '@/components/posts/CategoryBadge.vue'
import { fetchCategories } from '@/services/category'
import { fetchPost, createPost, updatePost } from '@/services/post'

const router = useRouter()
const props = defineProps<{ postId?: number }>()
const isEditing = computed(() => props.postId !== undefined)

const form = reactive<PostPayload>({
    title: '',
    content: '',
    categories: [],
})
const errors = reactive<Partial<Record<keyof PostPayload, string[]>>>({})
const categories = ref<Category[]>([])
const open = ref(false)
const submitting = ref(false)

onMounted(async () => {
    categories.value = await fetchCategories()

    if (isEditing.value) {
        const response: PostResponse = await fetchPost(props.postId!)
        const post = response.data
        form.title = post.title
        form.content = post.content
        form.categories = post.categories.map(c => c.id)
    }
})

async function onSubmit() {
    submitting.value = true;

    (Object.keys(errors) as (keyof typeof errors)[]).forEach(key => {
        delete errors[key]
    })

    try {
        let response: PostResponse

        if (isEditing.value) {
            response = await updatePost(props.postId!, form)
        } else {
            response = await createPost(form)
        }

        await router.push({
            name: 'post.show',
            params: { id: response.data.id }
        })
    } catch (err: any) {
        if (err.response?.status === 422 && err.response.data.errors) {
            Object.assign(errors, err.response.data.errors)
        } else {
            console.error(err)
        }
    } finally {
        submitting.value = false
    }
}
</script>

<template>
    <div class="
      max-w-2xl mx-auto  
      p-6 bg-white rounded shadow  
      transition-all duration-300 ease-in-out  
      hover:shadow-xl hover:ring-2 hover:ring-indigo-300
    ">
        <h2 class="text-2xl font-semibold mb-6">
            {{ isEditing ? 'Edit Post' : 'New Post' }}
        </h2>

        <form @submit.prevent="onSubmit" novalidate>
            <!-- Title -->
            <div class="mb-5">
                <label class="block mb-1 font-medium">Title</label>
                <input v-model="form.title" type="text" class="w-full border p-2 rounded" />
                <p v-if="errors.title" class="mt-1 text-red-600 text-sm">
                    {{ errors.title[0] }}
                </p>
            </div>

            <div class="mb-5">
                <label class="block mb-1 font-medium">Content</label>
                <textarea v-model="form.content" rows="6" class="w-full border p-2 rounded"></textarea>
                <p v-if="errors.content" class="mt-1 text-red-600 text-sm">
                    {{ errors.content[0] }}
                </p>
            </div>

            <div class="relative mb-6">
                <button type="button" @click="open = !open"
                    class="px-4 py-2 border rounded bg-white flex items-center gap-2">
                    <span>Categories</span>
                    <svg class="w-4 h-4" viewBox="0 0 20 20">
                        <path d="M5 8l5 5 5-5H5z" />
                    </svg>
                </button>

                <div v-if="open" class="fixed inset-0 bg-transparent" @click="open = false" />

                <div v-if="open"
                    class="absolute mt-2 w-48 max-h-60 overflow-auto bg-white border rounded shadow-lg p-2 z-20">
                    <label v-for="category in categories" :key="category.id"
                        class="flex items-center mb-1 cursor-pointer">
                        <input type="checkbox" :value="category.id" v-model="form.categories" class="mr-2" />
                        <CategoryBadge :category="category" />
                    </label>
                </div>

                <p v-if="errors.categories" class="mt-1 text-red-600 text-sm">
                    {{ errors.categories[0] }}
                </p>
            </div>

            <button type="submit" :disabled="submitting"
                class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
                {{ submitting
                    ? isEditing
                        ? 'Updating…'
                        : 'Creating…'
                    : isEditing
                        ? 'Update Post'
                        : 'Create Post' }}
            </button>
        </form>
    </div>
</template>