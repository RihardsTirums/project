import axios from '@/plugins/axios'
import type { PostsResponse, PostResponse, PostFilters, PostPayload } from '@/types/post'

export async function fetchPosts(params: PostFilters) {
    const { data } = await axios.get<PostsResponse>('/posts', { params });
    return data;
}

export async function fetchPost(id: number) {
    const { data } = await axios.get<PostResponse>(`/posts/${id}`)
    return data
}

export async function createPost(payload: PostPayload) {
    const { data } = await axios.post<PostResponse>('/posts', payload)
    return data
}

export async function updatePost(id: number, payload: PostPayload) {
    const { data } = await axios.put<PostResponse>(`/posts/${id}`, payload)
    return data
}

export async function deletePost(id: number): Promise<void> {
    await axios.delete<void>(`/posts/${id}`)
}