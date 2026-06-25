import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar";
import { MiniLoading } from "../Loading";
import type { FollowUser } from "../../types/FollowUser";
import { useProfileFollowing } from "../../hooks/profile/useProfileFollowing";

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

export const ProfileFollowing = ({ userId }: { userId: string }) => {
    const navigate = useNavigate();
    const {following, isLoading} = useProfileFollowing(userId);

    if (isLoading) return (
        <MiniLoading loading={isLoading} />
    )

    if (following.length === 0) return (
        <p className="text-white/30 text-sm text-center py-10">Not following anyone yet</p>
    )

    return (
        <div className="flex flex-col gap-2 -mt-5">
            {following.map(user => (
                <UserRow key={user.id} user={user} onClick={() => navigate(`/profile/${user.username}`)} />
            ))}
        </div>
    )
}