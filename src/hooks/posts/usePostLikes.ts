import { useState } from "react";
import { likePost, unlikePost } from "../../services/postService";
import { toastError } from "../../lib/toast";

export const usePostLike = (initialLiked: boolean, initialCount:number, postId: string) => {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialCount);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const handleLike = async () => {
            setIsAnimating(true);
            const wasLiked = liked;
            const oldLikeCount = likeCount;
            setTimeout(() => setIsAnimating(false), 300)
    
    
            if (liked) {
                setLiked(false);
                setLikeCount(prev => prev - 1);
                try {
                    await unlikePost(postId)
                } catch {
                    toastError("Error unliking post. Try again later.")
                    setLiked(wasLiked);
                    setLikeCount(oldLikeCount);
                }
            } else {
                setLiked(true);
                setLikeCount(prev => prev + 1);
                try {
                    await likePost(postId)
                } catch {
                    toastError("Error liking post. Try again later.")
                    setLiked(wasLiked);
                    setLikeCount(oldLikeCount);
                }
            }
        }

        return { liked, likeCount, isAnimating, handleLike };
}