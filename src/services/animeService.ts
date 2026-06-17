import supabase from '../supabase';
import { API_URL} from '../config/api';

export const getAnimeById = async (id:number) => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

     try {
        const response = await fetch(`${API_URL}/anime/${id}`, options);
        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.results;
} catch (err) {
    console.error(err);
    return null;
}
}

export const getAnimebySearch = async (query: string) => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(`${API_URL}/anime/search?search=${encodeURIComponent(query)}`, options);
        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.results;
        } catch (err) {
        console.error(err);
        return [];
    }
}