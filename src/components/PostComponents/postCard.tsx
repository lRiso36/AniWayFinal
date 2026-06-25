import type { PostType } from "../../types/PostType"
import { useAuth } from "../../context/Authcontext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ListCard } from "../MyListsComponents/ListCard"
import type { ListType } from "../../types/ListType"
import { Avatar } from "../Avatar"
import { usePostLike } from "../../hooks/posts/usePostLikes"
import { usePostComments } from "../../hooks/posts/usePostComments"

const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

type PostCardType = {
    post: PostType;
    onPostDeleted?: (postId: string) => void
}

export const PostCard = ({ post, onPostDeleted }: PostCardType) => {
    const navigate = useNavigate();
    const { username } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const [commentsOpen, setCommentsOpen] = useState(false);

    const [newComment, setNewComment] = useState('');

    const { liked, likeCount, isAnimating, handleLike } = usePostLike(post.isLiked, post.likeCount, post.id);
    const { comments, commentsLoading, commentCount, submitting, handleToggleComments, handleAddComment } = usePostComments(post.id, post.commentCount)
    const isOwner = username === post.userInfo.username;


    return (
        <div className="bg-[#12121f] border border-white/8 rounded-2xl p-4 flex flex-col gap-3">

            {/* header row */}
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => navigate(`/profile/${post.userInfo.username}`)}
                >
                    <Avatar
                        avatar={post.userInfo.avatar}
                        username={post.userInfo.username}
                    />
                    <div>
                        <p className="text-white text-sm font-semibold leading-tight">
                            {post.userInfo.display_name ?? post.userInfo.username}
                        </p>
                        <p className="text-white/35 text-xs">@{post.userInfo.username} · {timeAgo(post.created_at)}</p>
                    </div>
                </div>

                {/* isowner */}
                {isOwner && (
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white/30 hover:text-white/60 px-2 transition-colors text-2xl -mt-5 leading-relaxed"
                        >
                            ···
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-7 bg-[#1e1e2e] border border-white/10 rounded-xl shadow-xl w-32 py-1 z-20">
                                <button
                                    onClick={() => { setMenuOpen(false); onPostDeleted?.(post.id); }}
                                    className="w-full text-left px-4 py-1.5 text-sm text-red-400 hover:bg-white/5 transition-colors"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* caption */}
            {post.caption && (
                <p className="text-white/70 text-sm sm:text-base leading-relaxed px-2">{post.caption}</p>
            )}

            {post.anime && (
                post.type === 'just-because' ? (
                    <div
                        className="flex flex-col gap-1.5 cursor-pointer w-24"
                        onClick={() => navigate(`/anime/${post.anime!.anilist_id}`)}
                    >
                        <img
                            src={post.anime.cover_large}
                            alt={post.anime.title_english ?? post.anime.title_romaji}
                            className="w-24 h-32 rounded-lg object-cover shrink-0"
                        />
                        <p className="text-white text-xs font-medium line-clamp-2">
                            {post.anime.title_english ?? post.anime.title_romaji}
                        </p>
                    </div>
                ) : (
                    <div
                        className="flex gap-4 cursor-pointer"
                        onClick={() => navigate(`/anime/${post.anime!.anilist_id}`)}
                    >
                        <img
                            src={post.anime.cover_large}
                            alt={post.anime.title_english ?? post.anime.title_romaji}
                            className="w-16 h-22 sm:w-18 sm:h-24 sm:ml-2 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-white text-sm sm:text-base font-semibold line-clamp-2">
                                {post.anime.title_english ?? post.anime.title_romaji}
                            </p>
                            {post.score && (
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400 text-sm sm:text-base mb-[1px]">★</span>
                                    <span className="text-white font-bold text-sm sm:text-base">{post.score}</span>
                                    <span className="text-white/30 text-xs sm:text-sm">/10</span>
                                </div>
                            )}
                            <span className="text-purple-400/70 text-xs sm:text-sm capitalize">{post.type}</span>
                        </div>
                    </div>
                )
            )}

            {post.list && (
                <div className="w-[180px] sm:w-[240px] mx-auto">
                    <ListCard
                        list={post.list as ListType}
                        onClick={() => navigate(`/lists/${post.list!.id}`)}
                    />
                </div>
            )}

            {/* actions */}
            <div className="flex items-center gap-4 pt-1 border-t border-white/5 -mb-2">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 group"
                >
                    <span className={`text-2xl transition-transform ${isAnimating ? 'scale-125' : 'scale-100'} ${liked ? 'text-red-400' : 'text-white/30 group-hover:text-white/60'}`}>
                        {liked ? '♥' : '♡'}
                    </span>
                    <span className={`text-sm ${liked ? 'text-red-400' : 'text-white/30'}`}>{likeCount}</span>
                </button>

                <button
                    onClick={() => handleToggleComments(commentsOpen, setCommentsOpen)}
                    className="flex items-center gap-1.5 group">
                    <span className="text-xl text-white/30 group-hover:text-white/60 transition-colors mt-[2px]">💬</span>
                    <span className="text-white/30 text-sm">{commentCount}</span>
                </button>
            </div>

            {/* comment section */}
            {commentsOpen && (
                <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
                    {commentsLoading ? (
                        <div className="flex justify-center py-3">
                            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : comments.length === 0 ? (
                        <p className="text-white/30 text-xs text-center py-2">No comments yet</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {comments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-2.5">
                                    <div className="mt-0.5">
                                        <Avatar
                                            avatar={comment.userInfo?.avatar}
                                            username={comment.userInfo?.username}
                                            size="w-7 h-7"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white text-xs font-semibold">{comment.userInfo?.display_name ?? comment.userInfo?.username}</p>
                                        <p className="text-white/60 text-xs leading-relaxed">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* add comment input */}
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddComment(newComment, setNewComment)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                        />
                        <button
                            onClick={() => handleAddComment(newComment, setNewComment)}
                            disabled={!newComment.trim() || submitting}
                            className="bg-white/10 p-2 rounded-lg text-purple-500 text-xs font-medium disabled:opacity-30 hover:text-purple-300 transition-colors"
                        >
                            Post
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}