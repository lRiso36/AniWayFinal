import { useState } from "react";
import { RatingSlider } from "../RatingSlider";
import { useAnimeSearch } from "../../hooks/anime/useAnimeSearch";
import { useCreatePost } from "../../hooks/posts/useCreatePost";

type CreatePostModalType = {
    onClose: () => void;
    onPostCreated: () => void;
}

export const CreatePostModal = ({ onClose, onPostCreated }: CreatePostModalType) => {
    const [searchQuery, setSearchQuery] = useState('');


    const [caption, setCaption] = useState('');
    const [score, setScore] = useState<number | null>(null);


    const { animeSearchResults, searchLoading } = useAnimeSearch(searchQuery);
    const {
        selectedAnime,
        submitting,
        handleAnimeSelect,
        handleRemoveAnime,
        handleSubmit
    } = useCreatePost(onPostCreated, onClose);

    const handleRemove = () => {
        handleRemoveAnime();
        setScore(null);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-md p-6 flex flex-col gap-5">

                {/* header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold text-base">Create a Post</h2>
                    <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors text-xl">✕</button>
                </div>

                {/* selected anime preview */}
                {selectedAnime && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl">
                            <img
                                src={selectedAnime.coverImage.large}
                                alt={selectedAnime.title.english ?? selectedAnime.title.romaji}
                                className="w-9 h-12 rounded-lg object-cover shrink-0"
                            />
                            <p className="text-white text-sm font-medium line-clamp-2 flex-1">
                                {selectedAnime.title.english ?? selectedAnime.title.romaji}
                            </p>
                            <button
                                onClick={handleRemove}
                                className="text-white/30 hover:text-white/60 transition-colors text-sm shrink-0"
                            >
                                ✕
                            </button>
                        </div>

                        {/* score input */}

                        <div className="flex flex-col gap-3">
                            <RatingSlider value={score} onChange={setScore} />
                        </div>
                    </div>
                )}

                {/* anime search - only show if none selected */}
                {!selectedAnime && (
                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-xs">Attach an anime (optional)</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search for an anime..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                        />

                        {searchLoading && (
                            <div className="flex justify-center py-2">
                                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}

                        {searchQuery.trim() && !searchLoading && animeSearchResults.length === 0 && (
                            <div className="flex justify-center py-2">
                                <p className="text-white/30 text-sm">No anime found</p>
                            </div>
                        )}
                        
                        {animeSearchResults.length > 0 && (

                            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                                {animeSearchResults.map((anime: any) => (
                                    <div
                                        key={anime.anilistId}
                                        onClick={() => handleAnimeSelect(anime)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                                    >
                                        <img
                                            src={anime.coverImage.large}
                                            alt={anime.title.english ?? anime.title.romaji}
                                            className="w-9 h-12 rounded-lg object-cover shrink-0"
                                        />
                                        <p className="text-white text-sm line-clamp-2">
                                            {anime.title.english ?? anime.title.romaji}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* caption */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-white/40 text-xs">What's on your mind?</label>
                    <textarea
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        placeholder="Say something..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors resize-none"
                    />
                </div>

                <button
                    onClick={() => handleSubmit(caption, score)}
                    disabled={submitting || (!caption.trim() && !selectedAnime)}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {submitting ? 'Posting...' : 'Post'}
                </button>
            </div>
        </div>
    )
}