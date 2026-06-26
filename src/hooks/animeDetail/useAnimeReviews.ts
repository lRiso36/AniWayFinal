import { useState, useEffect } from "react";
import { getAnimeReviews } from "../../services/reviewService";
import type { AnimeReviewType } from "../../types/ReviewType";
import { toastError } from "../../lib/toast";

export const useAnimeReviews = (animeId: number) => {
    const [reviews, setReviews] = useState<AnimeReviewType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [loadMoreError, setLoadMoreError] = useState(false);

    const fetchReviews = async (reset: boolean) => {
        const newOffset = reset ? 0 : offset + 8;
        setOffset(newOffset);

        if (reset) {
            setIsLoading(true);
        } else {
            setIsLoadingMore(true);
        }

        try {
            setLoadMoreError(false);
            const currReviews = await getAnimeReviews(animeId, newOffset);
            if (reset) {
                setReviews(currReviews);
            } else {
                setReviews(prev => [...prev, ...currReviews]);
            }
            setHasMore(currReviews.length === 8);
        } catch {
            reset
                ? toastError("Failed to get reviews. Try again later.")
                : setLoadMoreError(true);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    useEffect(() => {
        fetchReviews(true);
    }, [animeId]);

    return { reviews, isLoading, isLoadingMore, hasMore, loadMoreError, fetchReviews };
}