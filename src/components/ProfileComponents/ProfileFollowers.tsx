import { useEffect, useState } from "react";
import { getFollowers } from "../../services/followService";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar";
import { toastError } from "../../lib/toast";
import { MiniLoading } from "../Loading";

type FollowUser = {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

const UserRow = ({ user, onClick }: { user: FollowUser, onClick: () => void }) => (
    <div
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
    >
        <Avatar
            avatar={user.avatar}
            username={user.username}
        />
        <div>
            <p className="text-white text-sm sm:text-base font-medium">{user.display_name ?? user.username}</p>
            <p className="text-white/40 text-xs sm:text-sm">@{user.username}</p>
        </div>
    </div>
)

export const ProfileFollowers = ({ userId }: { userId: string }) => {
    const [followers, setFollowers] = useState<FollowUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getFollowers(userId);
                setFollowers(data);
            } catch {
                toastError("Unable to get follower data right now.")
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [userId]);

    if (isLoading) return (
        <MiniLoading loading={isLoading} />
    )

    if (followers.length === 0) return (
        <p className="text-white/30 text-sm text-center py-10">No followers yet</p>
    )

    return (
        <div className="flex flex-col gap-2 -mt-5">
            {followers.map(user => (
                <UserRow key={user.id} user={user} onClick={() => navigate(`/profile/${user.username}`)} />
            ))}
        </div>
    )
}