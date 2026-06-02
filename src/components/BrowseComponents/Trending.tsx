import { useEffect, useRef } from "react";
import { getTrendingAnime } from "../../services/animeGroupService";
import type { AnimeType } from "../../types/AnimeType";

type TrendingAnimeType = {
    items: AnimeType[]
}

export const Trending = ({items}: TrendingAnimeType) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    }
    const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    }

    return (
    <div className="relative">
        {/* left arrow */}
        <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
            ‹
        </button>

        {/* scrollable row */}
        <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-none px-10"
        >
            {items.map((anime) => (
                <div key={anime.anilistId} className="w-[100px] sm:w-[140px] shrink-0 flex flex-col gap-2">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden">
                        <img
                            src={anime.coverImage.large}
                            alt={anime.title.english ?? anime.title.romaji}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-1">
                        {anime.title.english ?? anime.title.romaji}
                    </p>
                </div>
            ))}
        </div>

        {/* right arrow */}
        <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
            ›
        </button>
    </div>
)
}