import { useState, useEffect } from "react";
import type { ListType } from "../../types/ListType";
import { getUserLists, getLikedLists } from "../../services/userListsService";
import { toastError } from "../../lib/toast";

export const useProfileLists = (userId: string) => {
    const [lists, setLists] = useState<ListType[]>([]);
    const [likedLists, setLikedLists] = useState<ListType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [owned, liked] = await Promise.all([
                    getUserLists(userId),
                    getLikedLists(userId),
                ]);
                setLists((owned ?? []).filter((list: ListType) => list.isPublic));
                setLikedLists(liked ?? []);
            } catch {
                toastError("Unable to get user list data. Try again later.")
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, [userId]);

    return { lists, likedLists, loading };
}