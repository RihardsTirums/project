<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Credentials, ApiValidationErrors } from '@/types/auth'

const auth = useAuthStore()
const form = ref<Credentials>({ email: '', password: '' })
const errors = ref<Partial<ApiValidationErrors>>({})
const submitting = ref(false)

async function onSubmit() {
    submitting.value = true
    errors.value = {}
    try {
        await auth.login(form.value)
    } catch (err: any) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors
        } else {
            console.error(err)
        }
    } finally {
        submitting.value = false
    }
}
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <form @submit.prevent="onSubmit" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-900">
                    Email address
                </label>
                <input v-model="form.email" id="email" type="email" required
                    class="mt-2 block w-full rounded-md px-3 py-2 border" />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                    {{ errors.email[0] }}
                </p>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-900">
                    Password
                </label>
                <input v-model="form.password" id="password" type="password" required
                    class="mt-2 block w-full rounded-md px-3 py-2 border" />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                    {{ errors.password[0] }}
                </p>
            </div>

            <div>
                <button type="submit" :disabled="submitting"
                    class="w-full rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500">
                    <span v-if="submitting">Signing in…</span>
                    <span v-else>Sign in</span>
                </button>
            </div>
        </form>
    </div>
</template>