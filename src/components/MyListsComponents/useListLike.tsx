// hooks/useListLike.ts
import { useState, useEffect } from "react";
import { getIsListLiked, getListLikeCount, toggleListLike } from "../../services/userListsService";
import { toastError } from "../../lib/toast";

export const useListLike = (listId: string) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        if (!listId) return;

        const fetch = async () => {
            try {
                const count = await getListLikeCount(listId);
                const liked = await getIsListLiked(listId)
                setLikeCount(count);
                setIsLiked(liked);
            } catch {
                toastError("Unable to get like count for this list.")
            }
        }
        fetch();
    }, [listId]);

    const handleLike = async () => {
        if (likeLoading) return;

        setLikeLoading(true);
        const wasLiked = isLiked;
        setIsLiked(!wasLiked);
        setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);
        
        try {
            await toggleListLike(listId);
        } catch {
            setIsLiked(wasLiked);
            setLikeCount(prev => wasLiked ? prev + 1 : prev - 1);

            if(!wasLiked) {
                toastError("Failed to like this list. Try again later.");
            } else {
                toastError("Failed to remove like for this list. Try again later.");
            }
        } finally {
            setLikeLoading(false);
        }
    }

    return { likeCount, isLiked, handleLike };
}