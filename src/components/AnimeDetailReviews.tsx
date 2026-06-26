import { Avatar } from "./Avatar";
import { MiniLoading } from "./Loading";
import { useAnimeReviews } from "../hooks/animeDetail/useAnimeReviews";

type Props = {
    animeId: number;
}

export const AnimeReviews = ({ animeId }: Props) => {
    const {
        reviews,
        isLoading,
        isLoadingMore,
        hasMore,
        loadMoreError,
        fetchReviews
    } = useAnimeReviews(animeId);

    if (isLoading) return (
        <MiniLoading loading={isLoading} />
    )

    if (reviews.length === 0) return (
        <p className="text-white/30 text-sm text-center py-10">No reviews yet</p>
    )

    return (
        <div className="flex flex-col gap-3">
            {reviews.map(review => (
                <div
                    key={review.id}
                    className="bg-[#12121f] border border-white/8 rounded-2xl p-4 flex flex-col gap-2.5"
                >
                    <div className="flex items-center gap-2.5">
                        <Avatar
                            avatar={review.user.avatar}
                            username={review.user.username}
                        />
                        <div>
                            <p className="text-white text-sm sm:text-base font-medium leading-tight">
                                {review.user.display_name ?? review.user.username}
                            </p>
                            <p className="text-white/35 text-xs sm:text-sm">
                                @{review.user.username} · {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                        {review.score && (
                            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md px-2 py-1 ml-auto shrink-0">
                                <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                                <span className="text-white text-xs sm:text-sm font-medium">{review.score}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed px-1">{review.content}</p>
                </div>
            ))}

            {hasMore && (
                <button
                    onClick={() => fetchReviews(false)}
                    disabled={isLoadingMore}
                    className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors py-2 disabled:opacity-50"
                >
                    {loadMoreError ? 'Retry' : isLoadingMore ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    )
}