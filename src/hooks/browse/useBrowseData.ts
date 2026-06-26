// src/hooks/browse/useBrowseData.ts
import { useState, useEffect } from "react";
import { getTopRatedAnime, getTrendingAnime, getTrendingMovies, getHiddenGems } from "../../services/animeGroupService";
import { getUserAnime } from "../../services/userAnimeService";
import type { AnimeType } from "../../types/AnimeType";
import type { UserAnimeEntry } from "../../types/UserAnimeEntry";
import { toastError } from "../../lib/toast";

export const useBrowseData = () => {
    const [trendingAnime, setTrendingAnime] = useState<AnimeType[]>([]);
    const [topRatedAnime, setTopRatedAnime] = useState<AnimeType[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<AnimeType[]>([]);
    const [hiddenGems, setHiddenGems] = useState<AnimeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [animeEntryList, setAnimeEntryList] = useState<{ entry: UserAnimeEntry, anime: AnimeType }[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [trending, topRated, movies, gems, userAnime] = await Promise.all([
                getTrendingAnime(),
                getTopRatedAnime(),
                getTrendingMovies(),
                getHiddenGems(),
                getUserAnime()
            ]);
            setTrendingAnime(trending || []);
            setTopRatedAnime(topRated || []);
            setTrendingMovies(movies || []);
            setHiddenGems(gems || []);
            setAnimeEntryList(userAnime || []);
        } catch {
            toastError("Unable to get all browsing data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        trendingAnime, topRatedAnime, trendingMovies, hiddenGems,
        loading, animeEntryList, setAnimeEntryList
    };
};