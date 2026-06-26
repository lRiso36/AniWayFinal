import { useState, useEffect } from "react";
import type { ReviewType } from "../../types/ReviewType";
import { getUserReviews } from "../../services/reviewService";
import { toastError } from "../../lib/toast";

export const useProfileReviews = (userId: string) => {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReviews = async (reset: boolean) => {
            if (!userId) return;
    
            const newOffset = reset ? 0 : offset + 8;
            setOffset(newOffset);
    
    
            if (reset) {
                setIsLoading(true)
            } else {
                setIsLoadingMore(true)
            }
    
            try {
                const currReviews = await getUserReviews(userId, newOffset);
                if (reset) {
                    setReviews(currReviews)
                } else {
                    setReviews(prev => [...prev, ...currReviews]);
                }
                setHasMore(currReviews.length === 8);
            } catch (error) {
                toastError("There was a problem getting user reviews.")
            } finally {
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        }
    
        useEffect(() => {
            fetchReviews(true);
        }, [])

        return {reviews, isLoading, isLoadingMore, hasMore, offset, fetchReviews};
}