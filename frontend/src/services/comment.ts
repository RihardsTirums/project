import axios from '@/plugins/axios'
import type { Comment, CommentPayload } from '@/types/post'

export async function createComment(
    postId: number,
    payload: CommentPayload
): Promise<Comment> {
    const response = await axios.post<{ data: Comment }>(
        `/posts/${postId}/comments`,
        payload
    )
    return response.data.data
}

export async function deleteComment(
    commentId: number
): Promise<void> {
    await axios.delete(`/comments/${commentId}`)
}
