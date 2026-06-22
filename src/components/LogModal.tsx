import type { AnimeType } from "../types/AnimeType"
import type { UserAnimeEntry, UserAnimeStatus } from "../types/UserAnimeEntry"
import { useState, useEffect} from "react"
import { logAnime } from "../services/userAnimeService"
import { RatingSlider } from "./RatingSlider"

type LogModalTypes = {
    isOpen: boolean,
    onClose: () => void,
    anime: AnimeType,
    currentEntry?: UserAnimeEntry,
    onSave: (updated: UserAnimeEntry) => void
}

export const LogModal = ({isOpen, onClose, currentEntry, anime, onSave}: LogModalTypes) => {
    const [status, setStatus] = useState<UserAnimeStatus>(currentEntry?.status ?? 'plan-to-watch');
    const [currentEpisode, setCurrentEpisode] = useState<number>(currentEntry?.currentEpisode ?? 0);
    const [score, setScore] = useState<number | null>(currentEntry?.score ?? null);

    const handleSave = async () => {
    try {
        await logAnime(anime.anilistId, status, currentEpisode, anime.episodes, score);
        onSave({
            anilistId: anime.anilistId,
            status,
            currentEpisode,
            score,
            isFavorite: currentEntry?.isFavorite ?? false,
            startDate: currentEntry?.startDate ?? null,
            finishDate: currentEntry?.finishDate ?? null,
        });
    } catch (error){
        console.error(error);
    }
}

    
    const handleStatusChange = (newStatus: UserAnimeStatus) => {
        setStatus(newStatus);
        if (newStatus === 'completed') {
            setCurrentEpisode(anime.episodes ?? 0)
        }
        if (newStatus === 'plan-to-watch') {
            setCurrentEpisode(0);
        }
    }

    const handleEpisodeChange = ( ep: number) => {
        setCurrentEpisode(ep);
        if (ep === 0) { 
            setStatus('plan-to-watch');
        } else if (anime.episodes && ep === anime.episodes) {
            setStatus('completed');
        } else {
            setStatus('watching');
        }
    }

    useEffect(() => {
        setStatus(currentEntry?.status ?? 'plan-to-watch');
        setCurrentEpisode(currentEntry?.currentEpisode ?? 0);
        setScore(currentEntry?.score ?? null);
    }, [currentEntry]);

    if (!isOpen) return null;

    return (
        <div 
        className="
        fixed inset-0 
        bg-black/60 
        flex items-center 
        justify-center z-50"
        onClick={onClose}
        >
            <div 
            className="
            bg-[#1e1e2e] rounded-xl 
            p-4 sm:p-6 w-full max-w-md 
            mx-4 flex flex-col gap-4
            border border-white/10
            "
            onClick={(e) => e.stopPropagation()}
            >
                {/* content inside box*/}
                {/* header */}
                <div className="flex items-center justify-between
                border-b border-purple-500/60 pb-3
                ">
                    <h2 className="text-white font-semibold text-lg pl-1">Log Anime</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-lg">✕</button>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                    {/* image */}
                    <img 
                    src={anime.coverImage.large} 
                    alt={anime.title.english ?? anime.title.romaji} 
                    className="w-20 sm:w-22 object-cover rounded-lg shrink-0 aspect-[3/4]"
                    />
                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                        <div>
                        <p className="text-white text-base sm:text-base font-medium line-clamp-2">
                            {anime.title.english ?? anime.title.romaji}
                        </p>
                        <p className="text-white/40 text-xs sm:text-sm mt-0.5">
                        {anime.episodes} episodes
                        </p>
                        </div>
                        {/* status dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="text-white/40 text-xs uppercase tracking-wide">Status</label>
                                <select
                                value={status}
                                onChange={(e) => handleStatusChange(e.target.value as UserAnimeStatus)}
                                className="
                                bg-[#2a2a3e] text-white 
                                text-xs sm:text-sm rounded-lg 
                                px-2 sm:px-3 py-2.5 sm:py-2 border 
                                border-white/10 w-full"
                                >
                                <option value="watching">Watching</option>
                                <option value="completed">Completed</option>
                                <option value="plan-to-watch">Plan to Watch</option>
                                </select>
                        </div>

                        {status === 'watching' && (
                             <div className="flex flex-col gap-1">
                                <label className="text-white/40 text-xs uppercase tracking-wide">Current Episode</label>
                                <select
                                value={currentEpisode}
                                onChange={(e) => handleEpisodeChange(Number(e.target.value))}
                                className="bg-[#2a2a3e] text-white text-xs sm:text-sm rounded-lg px-2 sm:px-3 py-2.5 sm:py-2 border border-white/10 w-full"
                                >
                                    <option value={0}>Not Started</option>
                                    {anime.episodes
                                    ? Array.from({length: anime.episodes}, (_,i) => i + 1).map((ep) => (
                                        <option key={ep} value={ep}>Episode {ep}</option>
                                    ))
                                    :   <option value={0}>Unknown episodes</option>
                                    }
                                </select>
                            </div>
                        )}
                        {status === 'completed' && (
                            <div className="flex flex-col gap-3">
                               <RatingSlider value={score} onChange={setScore} />
                            </div>
                        )}
                    </div>
                </div>
                {/* save button */}
                <button
                    onClick={handleSave}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white text-base font-semibold py-2.5 rounded-lg transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
    )

}