import { useState, useEffect, useRef } from "react";
import type { ListDetailType } from "../../types/ListType";
import { getListById } from "../../services/userListsService";
import { toastError } from "../../lib/toast";

export const useListCard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [fullList, setFullList] = useState<ListDetailType | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleEditClick = async (listId: string) => {
        setEditLoading(true);
        try {
            const data = await getListById(listId);
            setFullList(data);
            setEditOpen(true);
        } catch {
            toastError("Unable to get list data. Try again later.")
        } finally {
            setEditLoading(false);
        }
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return {
        menuOpen, setMenuOpen,
        editOpen, setEditOpen,
        fullList, setFullList,
        editLoading,
        menuRef,
        handleEditClick,
    }
}