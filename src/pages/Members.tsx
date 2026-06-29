import { Avatar } from "../components/Avatar";
import { useMemberSearch } from "../hooks/useMemberSearch";
import type { FollowUser } from "../types/FollowUser";

export const Members = () => {
    const {
        query, setQuery,
        results,
        loading,
        recents,
        handleSelect,
        handleClearRecents
    } = useMemberSearch();
    const showingResults = query.trim().length > 0;

    return (
        <div className="min-h-screen bg-[#0a0a14]">
            <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 w-full">

                {/* search bar */}
                <div className="flex items-center gap-2 bg-[#12121f] border border-white/10 rounded-xl px-4 py-2 sm:py-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 shrink-0 sm:w-5 sm:h-5">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search by username..."
                        className="bg-transparent text-white text-sm sm:text-base placeholder-white/25 outline-none w-full"
                    />
                    {query && (
                        <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors shrink-0">✕</button>
                    )}
                </div>

                {/* content */}
                {showingResults ? (
                    loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : results.length === 0 ? (
                        <p className="text-white/30 text-sm sm:text-base text-center py-10">No users found for "{query.trim()}"</p>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {results.map(user => (
                                <UserRow key={user.id} user={user} onClick={() => handleSelect(user)} />
                            ))}
                        </div>
                    )
                ) : (
                    recents.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Recent</p>
                                <button
                                    onClick={handleClearRecents}
                                    className="text-purple-400 text-xs sm:text-sm hover:text-purple-300 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                            <div className="flex flex-col gap-1">
                                {recents.map(user => (
                                    <UserRow key={user.id} user={user} onClick={() => handleSelect(user)} />
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

const UserRow = ({ user, onClick }: { user: FollowUser, onClick: () => void }) => (
    <div
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
    >
        <Avatar
            avatar={user.avatar}
            username={user.username}
        />
        <div className="min-w-0">
            <p className="text-white text-sm sm:text-base font-medium line-clamp-1">{user.display_name ?? user.username}</p>
            <p className="text-white/40 text-xs sm:text-sm">@{user.username}</p>
        </div>
    </div>
)