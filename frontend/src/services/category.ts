import axios from '@/plugins/axios';
import type { Category } from '@/types/post';

export async function fetchCategories(): Promise<Category[]> {
    const { data } = await axios.get<{ data: Category[] }>('/categories');
    return data.data;
}