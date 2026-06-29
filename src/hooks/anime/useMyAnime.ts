// src/hooks/anime/useMyAnime.ts
import { useState, useEffect } from "react";
import { getUserAnime } from "../../services/userAnimeService";
import type { UserAnimeEntry } from "../../types/UserAnimeEntry";
import type { AnimeType } from "../../types/AnimeType";
import { toastError } from "../../lib/toast";

export const useMyAnime = () => {
    const [animeList, setAnimeList] = useState<{ entry: UserAnimeEntry, anime: AnimeType }[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAnimeData = async () => {
        setLoading(true);
        try {
            const data = await getUserAnime();
            setAnimeList(data);
        } catch {
            toastError("Failed to get user anime");
        } finally {
            setLoading(false);
        }
    };

    const handleEntryChange = (updated: UserAnimeEntry | null, anilistId: number) => {
        setAnimeList(prev => {
            if (updated === null) {
                return prev.filter(item => item.entry.anilistId !== anilistId);
            }
            return prev
            .map(item =>
                item.entry.anilistId === anilistId
                    ? { ...item, entry: { ...updated, updatedAt: new Date().toISOString() } }
                    : item
            )
            .sort((a, b) => {
                const aDate = a.entry.updatedAt ?? '';
                const bDate = b.entry.updatedAt ?? '';
                return bDate.localeCompare(aDate);
            });
        });
    };

    useEffect(() => {
        fetchAnimeData();
    }, []);

    const watching = animeList.filter(item => item.entry.status === 'watching').map(item => item.anime);
    const completed = animeList.filter(item => item.entry.status === 'completed').map(item => item.anime);
    const planToWatch = animeList.filter(item => item.entry.status === 'plan-to-watch').map(item => item.anime);
    const favorites = animeList.filter(item => item.entry.isFavorite).map(item => item.anime);
    const entries = animeList.map(item => item.entry);

    return { loading, watching, completed, planToWatch, favorites, entries, handleEntryChange };
};