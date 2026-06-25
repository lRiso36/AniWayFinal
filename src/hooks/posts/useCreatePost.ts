import { useState } from "react";
import { getUserAnimeStatus } from "../../services/userAnimeService";
import { createPost } from "../../services/postService";
import { toastError } from "../../lib/toast";
import type { AnimeType } from "../../types/AnimeType";
import { logAnime } from "../../services/userAnimeService";

export const useCreatePost = (onPostCreated: () => void, onClose: () => void) => {
    const [selectedAnime, setSelectedAnime] = useState<AnimeType | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleAnimeSelect = (anime: AnimeType) => {
        setSelectedAnime(anime);
    }
    
    const handleRemoveAnime = () => {
        setSelectedAnime(null);
    }

    const handleSubmit = async (caption: string, score: number | null) => {
        if (submitting) return;
        if (!caption.trim() && !selectedAnime) return;
        setSubmitting(true);


        const isRating = !!selectedAnime && score !== null;

        if (isRating) {
            try {
                const existing = await getUserAnimeStatus(selectedAnime.anilistId);
                await logAnime(
                    selectedAnime.anilistId,
                    existing?.status ?? 'completed',
                    existing?.current_episode ?? selectedAnime.episodes ?? 0,
                    selectedAnime.episodes ?? undefined,
                    score
                );
            } catch {
                toastError("Failed to add score to anime log. Try again later or log it in your 'My Anime'.")
            }
        }

        try {
            await createPost(
                isRating ? 'rating' : 'just-because',
                caption.trim() || null,
                selectedAnime?.anilistId ?? undefined,
                undefined,
                score ?? undefined
            );
            onPostCreated();
            onClose();
        } catch {
            toastError("Unable to create post. Try again later.")
        } finally {
            setSubmitting(false);
        }
    }

    return {
        selectedAnime,
        submitting,
        handleAnimeSelect,
        handleRemoveAnime,
        handleSubmit,
    }
}