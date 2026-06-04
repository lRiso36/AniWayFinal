import { useRef, useEffect} from "react";
import type { AnimeType } from "../../types/AnimeType";
import { AnimeCard } from "../AnimeCard";
import type { UserAnimeEntry } from "../../types/UserAnimeEntry";

type BrowseRowType = {
    title: string;
    items: AnimeType[];
    entries?: UserAnimeEntry[]
    getData: () => Promise<void>
}

export const BrowseRow = ({ title, items, entries, getData}: BrowseRowType) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const tripled = [...items, ...items, ...items];


    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    }
    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    }

        // on mount, scroll to the middle copy
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const third = el.scrollWidth / 3;
        el.scrollLeft = third;
    }, []);

    // when near edges, silently jump to middle copy
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const third = el.scrollWidth / 3;
            if (el.scrollLeft < third * 0.3) {
                el.scrollLeft = el.scrollLeft + third;
            } else if (el.scrollLeft > third * 1.7) {
                el.scrollLeft = el.scrollLeft - third;
            }
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [items]);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-white font-semibold text-base sm:text-lg md:text-xl px-4 mt-5">{title}</h2>
            <div className="relative">
                {/* left edge */}
                <div className="absolute left-0 top-0 h-full w-10 sm:w-14 bg-gradient-to-r from-[#0a0a14] to-transparent z-10 flex items-center justify-start">
                    <button
                        onClick={scrollLeft}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors ml-1"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                </div>

                {/* scrollable row */}
                <div ref={scrollRef} className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-none px-4 items-start">
                    {tripled.map((anime, index) => (
                        <div key={`${anime.anilistId}-${index}`} className="
                        w-[100px] sm:w-[120px] lg:w-[140px] shrink-0">
                        <AnimeCard
                        anime={anime}
                        entry={entries?.find(e => e.anilistId === anime.anilistId)}
                        getData={() => getData()}
                        />
                        </div>
                    ))}
                </div>

                {/* right edge */}
                <div className="absolute right-0 top-0 h-full w-10 sm:w-14 bg-gradient-to-l from-[#0a0a14] to-transparent z-10 flex items-center justify-end">
                    <button
                        onClick={scrollRight}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors mr-1"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}