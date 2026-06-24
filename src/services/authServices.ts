import supabase from '../supabase';
import type { AnimeType } from '../types/AnimeType';
import { API_URL } from '../config/api';

export const logIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export const signUp = async (
    username: string,
    email: string,
    password: string,
    avatar: string,
    displayName: string,
    bio: string,
    genres: string[],
    favorites: AnimeType[]
) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    if (!data.user) throw new Error('Signup failed');

    try {
        const { error: userError } = await supabase
            .from('users')
            .insert({
                id: data.user.id,
                username: username,
                display_name: displayName,
                avatar,
                bio,
                email: email
            });
        console.log('Step 2 result:', userError)
        if (userError) throw userError;

        //insert genres into genre table
        if (genres.length > 0) {
            const genreRows = genres.map((genre) => ({
                user_id: data.user!.id,
                genre: genre,
            }));

            const { error: genreError } = await supabase
                .from('user_favorite_genres')
                .insert(genreRows);

            if (genreError) throw genreError;
        }

        if (favorites.length > 0) {
            const animeRows = favorites.map((anime) => ({
                anilist_id: anime.anilistId,
                mal_id: anime.idMal,
                title_english: anime.title.english,
                title_romaji: anime.title.romaji,
                cover_large: anime.coverImage.large,
                cover_extra_large: anime.coverImage.extraLarge,
                banner_image: anime.bannerImage,
                year: anime.year,
                episodes: anime.episodes,
                description: anime.description,
                cached_at: new Date().toISOString(),
            }));

            const { error: animeError } = await supabase
                .from('anime')
                .upsert(animeRows, { onConflict: 'anilist_id' });

            if (animeError) {
                throw animeError
            };

            const favoriteRows = favorites.map((anime) => ({
                user_id: data.user!.id,
                anilist_id: anime.anilistId,
                status: 'completed',
                is_favorite: true,
                current_episode: anime.episodes ?? 0,
            }));

            const { error: favoritesError } = await supabase
                .from('user_anime')
                .insert(favoriteRows);

            if (favoritesError) {
                console.error(favoritesError);
                throw favoritesError
            };
        }
        return data;
    } catch (insertError: any) {
        try {
            console.log('attempting cleanup');
            const cleanupResponse = await fetch(`${API_URL}/auth/cleanup`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${data.session?.access_token}`
                }
            });
            console.log('cleanup response:', cleanupResponse.status);
        } catch (cleanupError) {
            console.error('cleanup failed:', cleanupError);
        }

        try {
            await supabase.from('users').delete().eq('id', data.user.id);
        } catch {
            console.error('user delete failed')
        }
        throw new Error('Failed to set up your account. Please try again.')
    }
}

export const checkUsernameAvailable = async (username: string): Promise<boolean> => {
    const { data } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .maybeSingle();

    return !data; // if no data found, username is available
}

export const checkEmailAvailable = async (email: string) => {
    const { data, error } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .maybeSingle();

    if (error) throw error;

    return !data;
}

export const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
}

export const updateEmail = async (userId: string, newEmail: string) => {
    const { error: authError } = await supabase.auth.updateUser({ email: newEmail });
    if (authError) throw authError;

    const { error: dbError } = await supabase
        .from('users')
        .update({ email: newEmail })
        .eq('id', userId);

    if (dbError) throw dbError;
}

export const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
    });
    console.log('forgotPassword result:', error);
    if (error) throw error;
}