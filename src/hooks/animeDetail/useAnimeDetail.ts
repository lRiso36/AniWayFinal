import { useState, useEffect } from "react";
import { getAnimeById } from "../../services/animeService";
import { getUserAnime, toggleIsFavorite } from "../../services/userAnimeService";
import type { AnimeDetailType } from "../../types/AnimeDetailType";
import type { UserAnimeEntry } from "../../types/UserAnimeEntry";
import { toastError } from "../../lib/toast";

export const useAnimeDetail = (id: string | undefined) => {
    const [animeDetails, setAnimeDetails] = useState<AnimeDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [entry, setEntry] = useState<UserAnimeEntry | null>(null);

    const fetchAnimeDetails = async () => {
        setLoading(true);
        try {
            const [details, userAnime] = await Promise.all([
                getAnimeById(Number(id)),
                getUserAnime()
            ]);
            setAnimeDetails(details);
            const match = userAnime.find((item: any) => item.anime.anilistId === Number(id));
            setEntry(match?.entry ?? null);
        } catch {
            toastError("Unable to get anime details at this time. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async () => {
        const wasFavorite = entry?.isFavorite ?? false;
        
        setEntry(prev =>
            prev
                ? { ...prev, isFavorite: !wasFavorite }
                : {
                    anilistId: animeDetails!.anilistId,
                    status: 'completed',
                    currentEpisode: animeDetails!.episodes ?? 0,
                    score: null,
                    isFavorite: true,
                    startDate: null,
                    finishDate: null,
                }
        );
        
        try {
            await toggleIsFavorite(animeDetails!.anilistId, animeDetails!.episodes);
        } catch {
            toastError(wasFavorite
                ? "Cannot remove from favorites right now. Try again later."
                : "Cannot add to favorites right now. Try again later."
            );
            setEntry(prev => prev ? { ...prev, isFavorite: wasFavorite } : null);
        }
    };

    useEffect(() => {
        fetchAnimeDetails();
    }, [])

    return { animeDetails, loading, entry, setEntry, toggleFavorite };
}