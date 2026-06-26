import type { AnimeType } from "../types/AnimeType"
import type { UserAnimeEntry } from "../types/UserAnimeEntry"
import { useRemoveAnime } from "../hooks/anime/useRemoveAnime"

type RemoveModalTypes = {
    isOpen: boolean,
    onClose: () => void,
    anime: AnimeType,
    currentEntry?: UserAnimeEntry,
    onSave: () => void
}

export const RemoveModal = ({ isOpen, onClose, anime, currentEntry, onSave }: RemoveModalTypes) => {
    const { isRemoving, handleRemove } = useRemoveAnime(anime.anilistId, onSave);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#1e1e2e] rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 flex flex-col gap-4 border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <div></div>
                    <h2 className="text-white font-semibold text-lg sm:text-xl text-center">Remove {anime.title.english ?? anime.title.romaji}?</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-lg">✕</button>
                </div>
                <div>
                    <p className="text-zinc-300 text-center text-xs sm:text-sm -mt-2 px-4">This will delete {anime.title.english ?? anime.title.romaji} and the following information from your anime</p>
                </div>
                <div className="flex flex-col gap-3 flex-1 min-w-0 bg-white/10 rounded-lg">
                    <div className="flex justify-between px-3 py-2 border-b border-white/10">
                        <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Status:</p>
                        <p className="text-white text-sm sm:text-base first-letter:uppercase">
                            {currentEntry?.status ? currentEntry?.status : "No Status"}
                        </p>
                    </div>
                    <div className="flex justify-between px-3 pb-2 border-b border-white/10">
                        <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Progress:</p>
                        <p className="text-white text-sm sm:text-base">
                            {currentEntry?.status === 'watching' && currentEntry?.currentEpisode
                                ? `${currentEntry.currentEpisode} / ${anime.episodes}`
                                : currentEntry?.status === 'completed'
                                    ? `${anime.episodes} / ${anime.episodes}`
                                    : currentEntry?.status === 'plan-to-watch' && anime.episodes
                                        ? `0 / ${anime.episodes}`
                                        : `—`
                            }
                        </p>
                    </div>
                    <div className="flex justify-between px-3 pb-2">
                        <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Score:</p>
                        <p className="text-white text-sm sm:text-base first-letter:uppercase">
                            {currentEntry?.score ? currentEntry.score : 'No Score'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className={`w-full bg-red-600 hover:bg-red-500 text-white text-base sm:text-lg font-semibold py-2.5 rounded-lg transition-colors ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isRemoving ? 'Removing...' : 'Remove'}
                </button>
            </div>
        </div>
    )
}