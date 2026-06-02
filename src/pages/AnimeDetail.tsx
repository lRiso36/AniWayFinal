import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { AnimeDetailType } from "../types/AnimeDetailType";
import { getAnimeById } from "../services/animeService";

export const AnimeDetail = () => {
    console.log('page')
    const { id } = useParams();
    const [animeDetails, setAnimeDetails] = useState<AnimeDetailType | null>(null);
    const [loading, setLoading] = useState(true)
    const fetchAnimeDetails = async () => {
        setLoading(true);
        const details = await getAnimeById(Number(id))
        setAnimeDetails(details);
        setLoading(false);
    }   

    useEffect(() => {
            fetchAnimeDetails();
        }, [])

    if (loading) return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
    )

    if (!animeDetails) return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <p className="text-white/50">Anime not found</p>
    </div>
    )

    return (
        <div className="bg-[#0a0a14] min-h-screen">
            {/*banner */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
            {/* this will be the whole bacground into gradient */}
            <img
            src={animeDetails.bannerImage ?? animeDetails.coverImage.extraLarge ?? ''}
            alt={animeDetails.title.english ?? animeDetails.title.romaji}
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#0a0a14]" />

            {/* back button */}
            <button 
                onClick={() => window.history.back()}
                className="absolute top-4 left-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
            </button>
        </div>
            {/* cover + info ocerlaid at bottom of the banner */}
            {/* top div will be full width, image fade into regular background before you get to nav at middle*/}
            <div className="max-w-6xl mx-auto px-2 sm:px-4 -mt-24 relative z-10 flex gap-4 sm:gap-6 items-end">
            {/* cover image */}
                <img
                    src={`${animeDetails.coverImage.large}`}
                    alt={animeDetails.title.english ?? animeDetails.title.romaji}
                    className="w-24 sm:w-36 lg:w-44 aspect-[3/4] object-cover rounded-lg shrink-0 shadow-lg"
                />

                {/* info */}
                <div className="flex flex-col gap-1 pb-2 flex-1 min-w-0">
                    <p className="text-white font-bold text-xl sm:text-3xl line-clamp-1">
                            {animeDetails.title.english ?? animeDetails.title.romaji}
                    </p>
                    {animeDetails.title.romaji && animeDetails.title.english && (
                            <p className="text-white/50 text-sm">{animeDetails.title.romaji}</p>
                    )}
                    <p className="text-white/60 text-xs sm:text-sm">
                            {animeDetails.year} · {animeDetails.episodes} eps · {animeDetails.genres.join(', ')}
                    </p>
                    {/* action buttons hidden on mobile */}
                    <div className="hidden sm:flex gap-2 mt-2">
                            <button className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                📺 Log
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors">
                                ❤️
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors">
                                ···
                            </button>
                    </div>
                    </div>
                    </div>
                </div>
    )
}