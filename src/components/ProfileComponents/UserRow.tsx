const UserRow = ({ user, onClick }: { user: FollowUser, onClick: () => void }) => (
    <div
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
    >
        <img
            src={user.avatar ?? ''}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div>
            <p className="text-white text-sm font-medium">{user.display_name ?? user.username}</p>
            <p className="text-white/40 text-xs">@{user.username}</p>
        </div>
    </div>
)