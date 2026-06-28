// src/hooks/members/useMemberSearch.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../services/followService";
import { toastError } from "../lib/toast";
import type { FollowUser } from "../types/FollowUser";

const RECENTS_KEY = "recentMemberSearches";
const MAX_RECENTS = 8;

export const useMemberSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FollowUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [recents, setRecents] = useState<FollowUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem(RECENTS_KEY);
        if (stored) {
            try {
                setRecents(JSON.parse(stored));
            } catch {
                setRecents([]);
                toastError("Unable to get recent searches");
            }
        }
    }, []);

    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const timer = setTimeout(async () => {
            try {
                const data = await searchUsers(query.trim());
                setResults(data ?? []);
            } catch {
                toastError("Unable to search users at this time. Please try again later.");
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (user: FollowUser) => {
        //add to recents
        const updated = [user, ...recents.filter(u => u.id !== user.id)].slice(0, MAX_RECENTS);
        setRecents(updated);
        localStorage.setItem(RECENTS_KEY, JSON.stringify(updated));
        navigate(`/profile/${user.username}`);
    };

    const handleClearRecents = () => {
        setRecents([]);
        localStorage.removeItem(RECENTS_KEY);
    };

    return { query, setQuery, results, loading, recents, handleSelect, handleClearRecents };
};