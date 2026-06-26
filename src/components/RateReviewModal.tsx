import { useState, useEffect } from "react";
import type { AnimeType } from "../types/AnimeType";
import type { UserAnimeEntry } from "../types/UserAnimeEntry";
import { RatingSlider } from "./RatingSlider";
import { useRateReview } from "../hooks/anime/useRateReview";

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
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const canSubmit = review.trim().length > 0 || score;

     const { 
        saving, 
        handleSave 
    } = useRateReview(anime, currentEntry, onSave, onClose, onPosted);

    useEffect(() => {
        setScore(currentEntry?.score ?? null);
        setReview('');
        setShareToFeed(false);
        setHasSubmitted(false);
    }, [isOpen]);

    const handleSubmit = async () => {
        setHasSubmitted(true);
        if (!canSubmit) return;
        await handleSave(score, review, shareToFeed);
    }

    const handleClose = () => {
        setHasSubmitted(false);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => {handleClose()}}
        >
            <div
                className="bg-[#1e1e2e] rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 flex flex-col gap-4 border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-purple-500/60 pb-3">
                    <h2 className="text-white font-semibold text-lg pl-1">Rate & Review</h2>
                    <button onClick={() => {handleClose()}} className="text-white/50 hover:text-white transition-colors text-lg">✕</button>
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
                    onClick={handleSubmit}
                    disabled={saving}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white text-base font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    )
}