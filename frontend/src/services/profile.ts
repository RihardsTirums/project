import type { PostsResponse, PostFilters } from '@/types/post'
import axios from '@/plugins/axios'

export async function fetchUserPosts(
    userId: number,
    params: PostFilters
): Promise<PostsResponse> {
    const { data } = await axios.get<PostsResponse>(`/profile/${userId}`, { params })
    return data
}
