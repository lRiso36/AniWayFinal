import supabase from '../supabase';
import { API_URL} from '../config/api';

const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
}


export const getProfile = async (username: string) => {
    const token = await getToken();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(`${API_URL}/profile/${username}`, options);
        if (!response.ok) return null;
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error(err);
        return null;
    }
} 

export const updateProfile = async (
    display_name: string,
    bio: string | null,
    avatar: string | null,
    banner_url: string | null,
) => {
    const token = await getToken();

    try {
        const response = await fetch(`${API_URL}/profile/update`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ display_name, bio, avatar, banner_url })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to update profile');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}