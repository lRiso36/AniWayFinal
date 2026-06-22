import { useState, useEffect } from "react";
import { getLikedLists, getUserLists } from "../../services/userListsService";
import type { ListType } from "../../types/ListType";
import { ListsContainer } from "../MyListsComponents/ListContainer";
import { MiniLoading } from "../Loading";

type ProfileListsType = {
    userId: string;
}

export const ProfileLists = ({userId}: ProfileListsType) => {
    const [lists, setLists] = useState<ListType[]>([]);
    const [likedLists, setLikedLists] = useState<ListType[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchAll = async () => {
            const [owned, liked] = await Promise.all([
                getUserLists(userId), 
                getLikedLists(userId),
            ]);
            setLists(owned ?? []);
            setLikedLists(liked ?? []);
            setLoading(false);
        }
        fetchAll();
    },[userId]);

    if (loading) return (
        <MiniLoading loading={loading} />
    )

    const allLists = [...lists, ...likedLists];

    if (allLists.length === 0) return (
        <p className="text-white/30 text-sm text-center py-10">No lists yet</p>
    );

    return (
        <div className="px-0.5 sm:px-4">
        <ListsContainer lists={allLists} />
        </div>
    );
}