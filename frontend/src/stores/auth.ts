import { defineStore } from 'pinia'
import router from '@/router'
import * as authService from '@/services/auth'
import type { Credentials, RegisterData } from '@/types/auth'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),

    actions: {
        async load() {
            try {
                const { data } = await authService.fetchUser()
                this.user = data
            } catch {
                this.user = null
            }
        },

        async login(creds: Credentials) {
            await authService.login(creds)
            await this.load()
            router.push({ name: 'posts' })
        },

        async register(data: RegisterData) {
            await authService.register(data)
            await this.load()
            router.push({ name: 'posts' })
        },

        async logout() {
            try {
                await authService.logout()
            } catch { }
            this.user = null
            router.push({ name: 'login' })
        },
    },
})
