// src/hooks/lists/useMyLists.ts
import { useState, useEffect } from "react";
import { getLikedLists, getUserLists } from "../../services/userListsService";
import type { ListType } from "../../types/ListType";
import { toastError } from "../../lib/toast";

export const useMyLists = () => {
    const [lists, setLists] = useState<ListType[]>([]);
    const [likedLists, setLikedLists] = useState<ListType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUserLists = async () => {
        try {
            const data = await getUserLists();
            setLists(data);
        } catch {
            toastError("Failed to get user lists");
        }
    };

    const fetchLikedLists = async () => {
        try {
            const data = await getLikedLists();
            setLikedLists(data);
        } catch {
            toastError("Failed to get liked lists");
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                await Promise.all([fetchUserLists(), fetchLikedLists()]);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const handleDelete = (listId: string) => {
        setLists(prev => prev.filter(l => l.id !== listId));
    };

    return { lists, likedLists, loading, fetchUserLists, handleDelete };
};