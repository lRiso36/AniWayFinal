import { useState } from "react"
import { getFeed } from "../services/postService"
import { PostCard } from "../components/PostComponents/postCard"
import { CreatePostModal } from "../components/PostComponents/CreatePostModal"
import { useAuth } from "../context/Authcontext"
import { Avatar } from "../components/Avatar"
import { useFeed } from "../hooks/posts/useFeed"
import { toastError } from "../lib/toast"

export const MainFeed = () => {
    const [filter, setFilter] = useState<'everyone' | 'following'>('everyone');
    const [modalOpen, setModalOpen] = useState(false);
    const { avatar, username } = useAuth();

    const { posts, setPosts, isLoading, isLoadingMore, hasMore, fetchPosts, handlePostDeleted } = useFeed(filter);

    return (
        <div className="min-h-screen bg-[#0a0a14]">
            <div className="max-w-2xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col gap-4">
                {/* compose box */}
                <div
                    onClick={() => setModalOpen(true)}
                    className="bg-[#12121f] border border-white/8 rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:border-white/15 transition-colors"
                >
                    <Avatar
                        avatar={avatar}
                        username={username}
                        size="w-9 h-9"
                    />

                    <p className="text-white/25 text-sm">What are you watching?</p>
                </div>

                {modalOpen && (
                    <CreatePostModal
                        onClose={() => setModalOpen(false)}
                        onPostCreated={async () => {
                            setModalOpen(false);
                            try {
                                const freshFeed = await getFeed('everyone', undefined);
                                setPosts(freshFeed ?? []);
                            } catch {
                                toastError("Unable to refresh feed. Try again later or manually refresh.");
                            }
                        }}
                    />
                )}

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('everyone')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'everyone'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 text-white/50 hover:text-white/80'
                            }`}
                    >
                        Everyone
                    </button>
                    <button
                        onClick={() => setFilter('following')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'following'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 text-white/50 hover:text-white/80'
                            }`}
                    >
                        Following
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <p className="text-white/30 text-sm text-center py-10">
                        {filter === 'following' ? "No posts from people you follow yet" : "No posts yet"}
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} onPostDeleted={handlePostDeleted} />
                        ))}
                    </div>
                )}

                {!isLoading && hasMore && posts.length > 0 && (
                    <button
                        onClick={() => fetchPosts(false)}
                        disabled={isLoadingMore}
                        className="text-purple-400 hover:text-purple-300 text-sm py-3 transition-colors disabled:opacity-50"
                    >
                        {isLoadingMore ? 'Loading...' : 'Load more'}
                    </button>
                )}
            </div>
        </div>
    )
}