import supabase from '../supabase';
import { API_URL} from '../config/api';
import type { UserAnimeStatus } from '../types/UserAnimeEntry';

export const getUserAnime = async () => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/user/useranimes`, options);
        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const logAnime = async (
    anilistId: number,
    status: UserAnimeStatus,
    currentEpisode?: number,
    episodes?: number | null,
    score?: number | null,
) => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            anilistId,
            status,
            currentEpisode,
            episodes,
            score
        })
    }

    try {
        console.log('fetching:', `${API_URL}/user/log`)
        const response = await fetch(`${API_URL}/user/log`, options);
        if (!response.ok) {
             const data = await response.json();
             throw new Error(data.error || 'Failed to log anime')
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const removeAnime = async (
    anilistId: number
) => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            anilistId,
        })
    }
    try {
        // console.log('fetching:', `${API_URL}/user/remove`)
        const response = await fetch(`${API_URL}/user/remove`, options);
        if (!response.ok) {
             const data = await response.json();
             throw new Error(data.error || 'Failed to remove anime')
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const toggleIsFavorite = async (
    anilistId: number,
    episodes: number | null,
) => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            anilistId,
            episodes,
        })
    }
    try {
        // console.log('fetching:', `${API_URL}/user/remove`)
        const response = await fetch(`${API_URL}/user/favorite`, options);
        if (!response.ok) {
             const data = await response.json();
             throw new Error(data.error || 'Failed to toggle favorite on anime')
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}
