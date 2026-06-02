import supabase from '../supabase';
import { API_URL} from '../config/api';

export const getTrendingAnime = async () => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

     try {
        const response = await fetch(`${API_URL}/browse/trending`, options);
        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
 
}

export const getTopRatedAnime = async () => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

     try {
        const response = await fetch(`${API_URL}/browse/top-rated`, options);
        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
 
}

export const getTrendingMovies = async () => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

     try {
        const response = await fetch(`${API_URL}/browse/trending-movies`, options);
        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
 
}

export const getHiddenGems = async () => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

     try {
        const response = await fetch(`${API_URL}/browse/hidden-gems`, options);
        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
 
}
