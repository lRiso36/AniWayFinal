import type { AnimeType } from "../types/AnimeType"
import type { UserAnimeEntry } from "../types/UserAnimeEntry"
import { AnimeCard } from "./AnimeCard"

type MyAnimeContainerType = {
    title: string;
    items: AnimeType[];   
    onViewAll?: () => void;
    mode?: "row" | "grid";
    entries?: UserAnimeEntry[];
}

// PROGRESS WILL COME FROM DATABASE LATER

export const MyAnimeConatiner = ({title, items, onViewAll, mode, entries}: MyAnimeContainerType) => {

    return (
        <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-base sm:text-lg md:text-xl px-2 py-1">{title}</h2>
            {mode === "row" && (
                <button
                onClick={onViewAll}
                className="
                text-purple-400 
                text-xs 
                sm:text-sm 
                hover:text-purple-300 
                transition-colors
                px-3
                "
                >
                View all
            </button>
            )}
        </div>
        <div className={
            mode === "row"
            ? "flex gap-3 overflow-x-auto scrollbar-none pb-4"
            : "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4"
            
        }>
            {items.map((anime) => (
                 <div key={anime.anilistId} className={mode === "row" ? "w-[100px] sm:w-[140px] shrink-0" : "w-full"}>
                <AnimeCard 
                anime={anime} 
                entry={entries?.find(e => e.anilistId === anime.anilistId)}
                />
                </div>
                ))}
        </div>
    </div>

    )
}