<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Comment } from '@/types/post'
import OwnerActions from '@/components/posts/OwnerActions.vue'
import { createComment, deleteComment } from '@/services/comment'
import AuthorLink from '@/components/posts/AuthorLink.vue'
import confetti from 'canvas-confetti'

const props = defineProps<{
    comments: Comment[]
    postId: number
}>()

const commentsList = ref<Comment[]>([...props.comments])
const newContent = ref('')
const errors = reactive<{ content?: string[] }>({})
const submitting = ref(false)

async function submitComment() {
    submitting.value = true
    delete errors.content

    try {
        const comment = await createComment(props.postId, {
            content: newContent.value
        })
        confetti({
            particleCount: 550,
            spread: 100,
            origin: { y: 0.6 }
        })
        commentsList.value.unshift(comment)
        newContent.value = ''
    } catch (err: any) {
        if (err.response?.status === 422) {
            errors.content = err.response.data.errors.content || []
        } else {
            console.error(err)
        }
    } finally {
        submitting.value = false
    }
}

async function removeComment(commentId: number) {
    try {
        await deleteComment(commentId)
        commentsList.value = commentsList.value.filter(comment => comment.id !== commentId)
    } catch {
        alert('Could not delete comment.')
    }
}
</script>

<template>
    <section class="mt-8 space-y-6">
        <h2 class="text-lg font-semibold">
            Comments ({{ commentsList.length }})
        </h2>

        <div>
            <h3 class="font-medium mb-2">Add a Comment</h3>
            <form @submit.prevent="submitComment" novalidate class="flex flex-col space-y-2">
                <textarea v-model="newContent" rows="3" class="w-full border p-2 rounded"
                    placeholder="Write your comment…"></textarea>
                <p v-if="errors.content" class="text-red-600 text-sm">
                    {{ errors.content[0] }}
                </p>
                <button type="submit" :disabled="submitting"
                    class="self-end px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
                    {{ submitting ? 'Posting…' : 'Post Comment' }}
                </button>
            </form>
        </div>

        <div v-for="comment in commentsList" :key="comment.id" class="p-4 bg-gray-50 rounded">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <p class="text-sm text-gray-800">{{ comment.content }}</p>

                    <div class="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                        <span>
                            By <i>
                                <AuthorLink :user="comment.user" />
                            </i>
                        </span>
                        <span>|</span>
                        <time :datetime="comment.created_at">
                            {{ comment.created_at }}
                        </time>
                    </div>
                </div>

                <OwnerActions :ownerId="comment.user.id" :showEdit="false" :showDelete="true"
                    :deleteAction="() => removeComment(comment.id)" />

            </div>
        </div>
    </section>
</template>