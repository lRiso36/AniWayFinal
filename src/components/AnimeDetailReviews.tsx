import { useState, useEffect } from "react"
import { getAnimeReviews } from "../services/reviewService";
import type { AnimeReviewType } from "../types/ReviewType";


type Props = {
    animeId: number;
}

export const AnimeReviews = ({ animeId }: Props) => {
    const [reviews, setReviews] = useState<AnimeReviewType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const fetchReviews = async (reset: boolean) => {
        const newOffset = reset ? 0 : offset + 8;
        setOffset(newOffset);

        if (reset) {
            setIsLoading(true);
        } else {
            setIsLoadingMore(true);
        }

        try {
            const currReviews = await getAnimeReviews(animeId, newOffset);
            if (reset) {
                setReviews(currReviews);
            } else {
                setReviews(prev => [...prev, ...currReviews]);
            }
            setHasMore(currReviews.length === 8);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    useEffect(() => {
        fetchReviews(true);
    }, [animeId]);

    if (isLoading) return (
        <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
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
                        <img
                            src={review.user.avatar ?? ''}
                            alt={review.user.username}
                            className="w-8 h-8 sm:h-10 sm:w-10 rounded-full object-cover shrink-0"
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
                    {isLoadingMore ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    )
}