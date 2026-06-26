import { useState } from "react";
import { logAnime, addReview } from "../../services/userAnimeService";
import { createPost } from "../../services/postService";
import { toastError } from "../../lib/toast";
import { toastSuccess } from "../../lib/toast";
import type { AnimeType } from "../../types/AnimeType";
import type { UserAnimeEntry } from "../../types/UserAnimeEntry";

export const useRateReview = (
    anime: AnimeType,
    currentEntry: UserAnimeEntry | undefined,
    onSave: (updated: UserAnimeEntry) => void,
    onClose: () => void,
    onPosted?: () => void,
) => {
    const [saving, setSaving] = useState(false);

    const handleSave = async (
        score: number | null,
        review: string,
        shareToFeed: boolean,
    ) => {
        setSaving(true);
        try {
            await logAnime(
                anime.anilistId,
                currentEntry?.status ?? 'completed',
                currentEntry?.currentEpisode ?? anime.episodes ?? 0,
                anime.episodes ?? undefined,
                score,
                review.trim() || null
            );

            if (review.trim()) {
                await addReview(anime.anilistId, review.trim());
            }

            onSave({
                anilistId: anime.anilistId,
                status: currentEntry?.status ?? 'completed',
                currentEpisode: currentEntry?.currentEpisode ?? anime.episodes ?? 0,
                score,
                isFavorite: currentEntry?.isFavorite ?? false,
                startDate: currentEntry?.startDate ?? null,
                finishDate: currentEntry?.finishDate ?? null,
            });

            if (shareToFeed) {
                try {
                    await createPost(
                        review.trim() ? 'review' : 'rating',
                        review.trim() || null,
                        anime.anilistId,
                        undefined,
                        score ?? undefined
                    );
                    onPosted?.();
                    toastSuccess("Posted to feed ✓");
                } catch {
                    toastError("Failed to post to feed");
                }
            }

            onClose();
        } catch {
            toastError("Failed to save, please try again");
        } finally {
            setSaving(false);
        }
    }

    return { saving, handleSave };
}