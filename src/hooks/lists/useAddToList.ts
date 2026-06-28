import { useState, useEffect } from "react";
import { getUserLists, addAnimeToList } from "../../services/userListsService";
import type { ListType } from "../../types/ListType";
import { toastError } from "../../lib/toast";

export const useAddToList = (
    animeId: number,
    onSave: () => void,
    onClose: () => void,
) => {
    const [userLists, setUserLists] = useState<ListType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const lists = await getUserLists();
                setUserLists(lists);
            } catch {
                toastError("Failed to get user lists");
            } finally {
                setLoading(false);
            }
        }
        fetchLists();
    }, []);

    const handleSave = async (listToAdd: ListType | null) => {
        if (!listToAdd) return;
        setError(null);
        try {
            await addAnimeToList(listToAdd.id, animeId);
            onSave();
            onClose();
        } catch (error) {
            if (error instanceof Error && (error.message.includes('unique') || error.message.includes('duplicate'))) {
                setError('This anime is already in that list');
            } else {
                setError('Failed to add anime to list');
                toastError("Failed to add anime to list. Try again later.");
            }
        }
    }

    return { userLists, loading, error, handleSave };
}