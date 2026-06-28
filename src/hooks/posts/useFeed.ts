// src/hooks/feed/useFeed.ts
import { useState, useEffect } from "react";
import { getFeed, deletePost } from "../../services/postService";
import { toastError } from "../../lib/toast";

export const useFeed = (filter: 'everyone' | 'following') => {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async (reset: boolean) => {
        if (reset) setIsLoading(true);
        else setIsLoadingMore(true);

        const cursor = reset ? undefined : posts[posts.length - 1]?.created_at;
        try {
            const data = await getFeed(filter, cursor);
            if (reset) setPosts(data);
            else setPosts(prev => [...prev, ...data]);
            setHasMore(data.length === 20);
        } catch {
            toastError("We are unable to get posts right now. Try again later.");
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchPosts(true);
    }, [filter]);

    const handlePostDeleted = async (postId: string) => {
        try {
            const success = await deletePost(postId);
            if (success) setPosts(prev => prev.filter(p => p.id !== postId));
        } catch {
            toastError("Unable to delete post right now. Try again later.");
        }
    };

    return { posts, setPosts, isLoading, isLoadingMore, hasMore, fetchPosts, handlePostDeleted };
};