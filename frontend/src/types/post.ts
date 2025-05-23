export interface User {
    id: number
    name: string
}

export interface Category {
    id: number
    name: string
}

export interface Post {
    id: number
    title: string
    content: string
    created_at: string
    user: User
    categories: Category[]
    comments_count: number
}

export interface Comment {
    id: number
    content: string
    created_at: string
    user: User
}

export interface PostDetail extends Post {
    comments: Comment[]
}

export interface PostsResponse {
    data: {
        posts: Post[]
        meta: {
            total: number
            per_page: number
            current_page: number
            last_page: number
        }
    }
}

export interface PostResponse {
    data: PostDetail
}

export interface PostFilters {
    search: string;
    categories: number[];
    per_page: number;
    page: number;
}
