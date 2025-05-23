import axios from '@/plugins/axios'
import type { PostsResponse, PostResponse, PostFilters } from '@/types/post'

export async function fetchPosts(params: PostFilters) {
    const { data } = await axios.get<PostsResponse>('/posts', { params });
    return data;
}

export async function fetchPost(id: number) {
    const { data } = await axios.get<PostResponse>(`/posts/${id}`)
    return data
}