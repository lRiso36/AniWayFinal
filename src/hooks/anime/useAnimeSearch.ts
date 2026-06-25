import { useState, useEffect } from "react";
import { getAnimebySearch } from "../../services/animeService";
import type { AnimeType } from "../../types/AnimeType";
import { toastError } from "../../lib/toast";

export const useAnimeSearch = (query: string) => {
    const [animeSearchResults, setAnimeSearchResults] = useState<AnimeType[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
            if (!query.trim()) {
                setAnimeSearchResults([]);
                return;
            }
    
            const timer = setTimeout(async () => {
                setSearchLoading(true);
                try {
                    const results = await getAnimebySearch(query);
                    setAnimeSearchResults(results);
                } catch {
                    toastError("Failed to search anime")
                } finally {
                    setSearchLoading(false);
                }
            }, 500);
    
            return () => clearTimeout(timer);
        }, [query]);

        return {animeSearchResults, searchLoading}
}