import supabase from '../supabase';
import { API_URL } from '../config/api';

const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
}

export const getUserReviews = async (userId: string, offset: number = 0) => {
    const token = await getToken();
    try {
        const response = await fetch(`${API_URL}/reviews/user/${userId}?offset=${offset}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getAnimeReviews = async (animeId: number, offset: number = 0) => {
    const token = await getToken();
    try {
        const response = await fetch(`${API_URL}/reviews/anime/${animeId}?offset=${offset}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}