import supabase from '../supabase';
import { API_URL } from '../config/api';

const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
}

export const createPost = async (
    type: 'rating' | 'review' | 'list' | 'clip' | 'just-because',
    caption: string | null,
    animeId?: number,
    listId?: string,
    score?: number
) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, caption, animeId, listId, score })
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getFeed = async (filter: 'everyone' | 'following', cursor?: string) => {
    const token = await getToken();
    const params = new URLSearchParams({ filter });
    if (cursor) params.append('cursor', cursor);

    try {
        const response = await fetch(`${API_URL}/posts/feed?${params}`, {
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

export const likePost = async (postId: string) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/like/${postId}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const unlikePost = async (postId: string) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/unlike/${postId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const addComment = async (postId: string, content: string) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/comment/add/${postId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteComment = async (commentId: string) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const deletePost = async (postId: string) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/delete/${postId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getComments = async (postId: string) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/posts/comments/${postId}`, {
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