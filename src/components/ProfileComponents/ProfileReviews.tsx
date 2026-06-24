import { useState, useEffect } from "react"
import type { ReviewType } from "../../types/ReviewType";
import { getUserReviews } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../lib/toast";
import { MiniLoading } from "../Loading";

type ProfileReviewsType = {
    userId: string;
}
export const ProfileReviews = ({ userId }: ProfileReviewsType) => {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const navigate = useNavigate();

    const fetchReviews = async (reset: boolean) => {
        if (!userId) return;

        const newOffset = reset ? 0 : offset + 8;
        setOffset(newOffset);


        if (reset) {
            setIsLoading(true)
        } else {
            setIsLoadingMore(true)
        }

        try {
            const currReviews = await getUserReviews(userId, newOffset);
            if (reset) {
                setReviews(currReviews)
            } else {
                setReviews(prev => [...prev, ...currReviews]);
            }
            setHasMore(currReviews.length === 8);
        } catch (error) {
            toastError("There was a problem getting user reviews.")
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    useEffect(() => {
        fetchReviews(true);
    }, [])

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
                    className="bg-[#12121f] border border-white/8 rounded-2xl p-1.5 px-3 flex gap-3 cursor-pointer hover:border-white/15 transition-colors"
                    onClick={() => navigate(`/anime/${review.anime.anilist_id}`)}
                >
                    <img
                        src={review.anime.cover_large}
                        alt={review.anime.title_english ?? review.anime.title_romaji}
                        className="w-12 h-17 sm:w-18 sm:h-25 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-white text-sm sm:text-base font-medium line-clamp-1">
                                    {review.anime.title_english ?? review.anime.title_romaji}
                                </p>
                                <p className="text-white/30 text-xs sm:text-sm mt-0.5">
                                    {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            {review.score && (
                                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md px-2 py-1 shrink-0">
                                    <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">{review.score}</span>
                                </div>
                            )}
                        </div>
                        <hr className="border-white/5 my-2" />
                        <p className="text-white/60 text-xs sm:text-base leading-relaxed">{review.content}</p>
                    </div>
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