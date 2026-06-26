import { useState } from "react";
import { logAnime } from "../../services/userAnimeService";
import { toastError } from "../../lib/toast";
import type { AnimeType } from "../../types/AnimeType";
import type { UserAnimeEntry, UserAnimeStatus } from "../../types/UserAnimeEntry";

export const useLogModal = (
    anime: AnimeType,
    currentEntry: UserAnimeEntry | undefined,
    onSave: (updated: UserAnimeEntry) => void,
) => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (
        status: UserAnimeStatus,
        currentEpisode: number,
        score: number | null,
    ) => {
        setIsSaving(true);
        try {
            await logAnime(anime.anilistId, status, currentEpisode, anime.episodes, score);
            onSave({
                anilistId: anime.anilistId,
                status,
                currentEpisode,
                score,
                isFavorite: currentEntry?.isFavorite ?? false,
                startDate: currentEntry?.startDate ?? null,
                finishDate: currentEntry?.finishDate ?? null,
            });
        } catch {
            toastError("Failed to log anime, please try again");
        } finally {
            setIsSaving(false);
        }
    }

    const handleStatusChange = (
        newStatus: UserAnimeStatus,
        setStatus: (s: UserAnimeStatus) => void,
        setCurrentEpisode: (ep: number) => void,
    ) => {
        setStatus(newStatus);
        if (newStatus === 'completed') setCurrentEpisode(anime.episodes ?? 0);
        if (newStatus === 'plan-to-watch') setCurrentEpisode(0);
    }

    const handleEpisodeChange = (
        ep: number,
        setStatus: (s: UserAnimeStatus) => void,
        setCurrentEpisode: (ep: number) => void,
    ) => {
        setCurrentEpisode(ep);
        if (ep === 0) setStatus('plan-to-watch');
        else if (anime.episodes && ep === anime.episodes) setStatus('completed');
        else setStatus('watching');
    }

    return { isSaving, handleSave, handleStatusChange, handleEpisodeChange };
}