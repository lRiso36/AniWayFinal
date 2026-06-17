import supabase from '../supabase';
import { API_URL } from '../config/api';

const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
}

export const followUser = async (targetId: string) => {
    const token = await getToken();

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/follow/${targetId}`, options);
        if (!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const unfollowUser = async (targetId: string) => {
    const token = await getToken();

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/unfollow/${targetId}`, options);
        if (!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getFollowCounts = async (userId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/counts/${userId}`, options);
        if (!response.ok) return { followers: 0, following: 0 };
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return { followers: 0, following: 0 };
    }
}

export const getIsFollowing = async (targetId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/is-following/${targetId}`, options);
        if (!response.ok) return false;
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getFollowers = async (userId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/followers/${userId}`, options);
        if (!response.ok) return [];
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFollowing = async (userId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/following/${userId}`, options);
        if (!response.ok) return [];
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const searchUsers = async (query: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/follow/search?query=${encodeURIComponent(query)}`, options);
        if (!response.ok) return [];
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}