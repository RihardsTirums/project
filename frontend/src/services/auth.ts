import axios from '@/plugins/axios'
import type { Credentials, RegisterData } from '@/types/auth'
import type { User } from '@/types/user'

export function login(creds: Credentials) {
    return axios.post<void>('/login', creds)
}

export function register(data: RegisterData) {
    return axios.post<void>('/register', data)
}

export function fetchUser() {
    return axios.get<User>('/user')
}

export function logout() {
    return axios.post('/logout')
}