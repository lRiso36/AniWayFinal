// src/hooks/browse/useGenreFilter.ts
import { useState, useEffect } from "react";
import type { AnimeType } from "../../types/AnimeType";
import { getAnimeByGenre } from "../../services/animeGenreService";
import { toastError } from "../../lib/toast";

export const useGenreFilter = () => {
    const [activeGenre, setActiveGenre] = useState("All");
    const [genreResults, setGenreResults] = useState<AnimeType[]>([]);
    const [genreLoading, setGenreLoading] = useState(true);

    const fetchGenreAnime = async (genre: string) => {
        setGenreLoading(true);
        try {
            const genreAnimes = await getAnimeByGenre(genre);
            setGenreResults(genreAnimes || []);
        } catch {
            toastError(`Unable to get data for ${genre} genre`);
        } finally {
            setGenreLoading(false);
        }
    };

    useEffect(() => {
        if (activeGenre !== 'All') {
            fetchGenreAnime(activeGenre);
        } else {
            setGenreResults([]);
        }
    }, [activeGenre]);

    return { activeGenre, setActiveGenre, genreResults, genreLoading };
};