import supabase from '../supabase';
import { API_URL} from '../config/api';

const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
}

export const getUserLists = async (userId?: string) => {
    const token = await getToken();
    const url = userId ? `${API_URL}/lists/user/${userId}` : `${API_URL}/lists/user`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(url, options);
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

export const createUserList = async (
    name: string,
    description: string | null,
    isPublic: boolean,
    isRanked: boolean,
    animeIds: number[]
) => {
    const token = await getToken();

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            isPublic: isPublic,
            isRanked: isRanked,
            animeIds: animeIds
        })
    }

     try {
        const response = await fetch(`${API_URL}/lists/create`, options);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data.data;
        } catch (err) {
            console.error(err)
            return;
        }
}

export const updateUserList = async (
    listId: string,
    name: string,
    description: string | null,
    isPublic: boolean,
    isRanked: boolean,
    animeIds: number[]
) => {
    const token = await getToken();

    const options = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            isPublic,
            isRanked,
            animeIds
        })
    }

    try {
        const response = await fetch(`${API_URL}/lists/update/${listId}`, options);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const getListById = async (listId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/lists/${listId}`, options);
        if (!response.ok) return null;
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteUserList = async (listId: string) => {
    const token = await getToken();

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/lists/delete/${listId}`, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to delete list');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const toggleListLike = async (listId: string) => {
    const token = await getToken();

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/lists/user/like/${listId}`, options);
        if (!response.ok) throw new Error('Failed to toggle like');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getListLikeCount = async (listId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/lists/like/${listId}`, options);
        if (!response.ok) throw new Error('Failed to get like count');
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error(error);
        return { count: 0, isLiked: false };
    }
}

export const getIsListLiked = async (listId: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/lists/user/is-liked/${listId}`, options);
        if (!response.ok) return false;
        const data = await response.json();
        return data.isLiked;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getLikedLists = async (userId?: string) => {
    const token = await getToken();
    const url = userId ? `${API_URL}/lists/user/liked/${userId}` : `${API_URL}/lists/user/liked`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) return [];
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const addAnimeToList = async (listId: string, anilistId: number) => {
    const token = await getToken();
    try {
        const response = await fetch(`${API_URL}/lists/add-anime/${listId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ anilistId })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to add anime to list');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}