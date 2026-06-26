import { useState, useEffect } from "react";
import type { AnimeType } from "../../types/AnimeType";
import { searchAnime } from "../../cache/animeCache";
import { toastError } from "../../lib/toast";

export const useSignupAnimeSearch = (query: string) => {
    const [searchResults, setSearchResults] = useState<AnimeType[]>([]);

    useEffect(() => {
        if (query.length < 3) {
            setSearchResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const results = await searchAnime(query);
                setSearchResults(results);
            } catch {
                toastError(`Unable to get results for ${query.trim()}. Try again later.`);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    return { searchResults };
}