import supabase from '../supabase';
import { API_URL} from '../config/api';

export const getUserLists = async () => {
    const { data: {session}} = await supabase.auth.getSession();
    const token = session?.access_token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}/lists/userlists`, options);
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