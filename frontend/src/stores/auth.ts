import { defineStore } from 'pinia'
import router from '@/router'
import * as authService from '@/services/auth'
import type { Credentials, RegisterData } from '@/types/auth'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        loaded: false,
    }),
    actions: {
        async load() {
            if (this.loaded) return
            try {
                const { data } = await authService.fetchUser()
                this.user = data
            } catch {
                this.user = null
            } finally {
                this.loaded = true
            }
        },

        async login(creds: Credentials) {
            await authService.login(creds)
            this.loaded = false
            await this.load()
            router.push({ name: 'posts' })
        },

        async register(data: RegisterData) {
            await authService.register(data)
            this.loaded = false
            await this.load()
            router.push({ name: 'posts' })
        },

        async logout() {
            await authService.logout().catch(() => { })
            this.user = null
            this.loaded = true
            router.push({ name: 'login' })
        },
    },
})
