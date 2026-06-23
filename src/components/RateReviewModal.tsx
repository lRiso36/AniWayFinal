import { useState, useEffect } from "react";
import type { AnimeType } from "../types/AnimeType";
import type { UserAnimeEntry } from "../types/UserAnimeEntry";
import { logAnime, addReview } from "../services/userAnimeService";
import { createPost } from "../services/postService";
import { RatingSlider } from "./RatingSlider";
import toast from "react-hot-toast";

type RateReviewType = {
    isOpen: boolean;
    onClose: () => void;
    anime: AnimeType;
    currentEntry?: UserAnimeEntry;
    onSave: (updated: UserAnimeEntry) => void;
    onPosted?: () => void;
}

export const RateReviewModal = ({ isOpen, onClose, anime, currentEntry, onSave, onPosted }: RateReviewType) => {
    const [score, setScore] = useState<number | null>(currentEntry?.score ?? null);
    const [review, setReview] = useState('');
    const [shareToFeed, setShareToFeed] = useState(false);
    const [saving, setSaving] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const canSubmit = review.trim().length > 0 || score;

    useEffect(() => {
        setScore(currentEntry?.score ?? null);
        setReview('');
        setShareToFeed(false);
    }, [isOpen]);

    const handleSave = async () => {
        setHasSubmitted(true)
        if (!canSubmit) return

        setSaving(true);
        try {
            await logAnime(
                anime.anilistId,
                currentEntry?.status ?? 'completed',
                currentEntry?.currentEpisode ?? anime.episodes ?? 0,
                anime.episodes ?? undefined,
                score,
                review.trim() || null
            );

            if (review.trim()) {
                await addReview(anime.anilistId, review.trim())
            }

            onSave({
                anilistId: anime.anilistId,
                status: currentEntry?.status ?? 'completed',
                currentEpisode: currentEntry?.currentEpisode ?? anime.episodes ?? 0,
                score,
                isFavorite: currentEntry?.isFavorite ?? false,
                startDate: currentEntry?.startDate ?? null,
                finishDate: currentEntry?.finishDate ?? null,
            });

            if (shareToFeed) {
                try {
                    await createPost(
                        review.trim() ? 'review' : 'rating',
                        review.trim() || null,
                        anime.anilistId,
                        undefined,
                        score ?? undefined
                    );
                    onPosted?.();
                } catch {
                    toast.error("Failed to post to feed")
                }
            }

            onClose();
        } catch {
            toast.error("Failed to save, please try again")
        } finally {
            setSaving(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => { onClose(); setHasSubmitted(false) }}
        >
            <div
                className="bg-[#1e1e2e] rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 flex flex-col gap-4 border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-purple-500/60 pb-3">
                    <h2 className="text-white font-semibold text-lg pl-1">Rate & Review</h2>
                    <button onClick={() => { onClose(); setHasSubmitted(false) }} className="text-white/50 hover:text-white transition-colors text-lg">✕</button>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start">
                    <img
                        src={anime.coverImage.large}
                        alt={anime.title.english ?? anime.title.romaji}
                        className="w-20 sm:w-22 object-cover rounded-lg shrink-0 aspect-[3/4]"
                    />
                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                        <div>
                            <p className="text-white text-base font-medium line-clamp-2">
                                {anime.title.english ?? anime.title.romaji}
                            </p>
                            <p className="text-white/40 text-xs mt-0.5">{anime.episodes} episodes</p>
                        </div>
                        <RatingSlider value={score} onChange={setScore} />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 -mt-3">
                    <label className="text-white/40 text-xs uppercase tracking-wide">Review</label>
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        placeholder="What did you think?"
                        rows={4}
                        className="w-full bg-[#2a2a3e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors resize-none"
                    />
                </div>

                <button
                    onClick={() => setShareToFeed(!shareToFeed)}
                    className={`flex items-center gap-2 text-sm transition-colors ${shareToFeed ? 'text-purple-400' : 'text-white/30 hover:text-white/50'}`}
                >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${shareToFeed ? 'bg-purple-600 border-purple-600' : 'border-white/20'}`}>
                        {shareToFeed && <span className="text-white text-xs">✓</span>}
                    </div>
                    Share to feed
                </button>

                {hasSubmitted && !canSubmit && (
                    <p className="text-red-400 text-xs">You must fill out at least one field</p>
                )}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white text-base font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    )
}