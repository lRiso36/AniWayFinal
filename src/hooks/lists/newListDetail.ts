// src/hooks/lists/useListDetail.ts
import { useState, useEffect } from "react";
import type { ListDetailType } from "../../types/ListType";
import { getListById } from "../../services/userListsService";
import { toastError } from "../../lib/toast";

export const useListDetail = (listId: string | undefined) => {
    const [list, setList] = useState<ListDetailType | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        if (!listId) {
            setLoading(false);
            return
        };
        try {
            const data = await getListById(listId);
            setList(data);
        } catch {
            toastError("Unable to get list data right now. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, [listId]);

    return { list, loading, fetchList };
};