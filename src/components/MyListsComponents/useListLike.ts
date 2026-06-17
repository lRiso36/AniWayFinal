// hooks/useListLike.ts
import { useState, useEffect } from "react";
import { getIsListLiked, getListLikeCount, toggleListLike } from "../../services/userListsService";

export const useListLike = (listId: string) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const count = await getListLikeCount(listId);
            const liked = await getIsListLiked(listId)
            setLikeCount(count);
            setIsLiked(liked);
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
        }
        setLikeLoading(false);
    }

    return { likeCount, isLiked, handleLike };
}