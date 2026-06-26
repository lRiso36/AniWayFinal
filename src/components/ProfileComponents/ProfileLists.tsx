import { ListsContainer } from "../MyListsComponents/ListContainer";
import { MiniLoading } from "../Loading";
import { useProfileLists } from "../../hooks/profile/useProfileLists";

type ProfileListsType = {
    userId: string;
}

export const ProfileLists = ({ userId }: ProfileListsType) => {
    const {lists, likedLists, loading } = useProfileLists(userId);

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