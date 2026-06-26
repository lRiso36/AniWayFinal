import { useState } from "react";
import type { AnimeType } from "../../types/AnimeType";
import { SignUpAnimeCard } from "./SignUpAnimeCard";
import { useSignupAnimeSearch } from "../../hooks/anime/useSignUpAnimeSearch";

type onSelectType = {
    onSelect: (anime: AnimeType) => void
    selectedAnimes: AnimeType[]
}

export const AnimeSearch = ({ onSelect, selectedAnimes }: onSelectType) => {
    const [query, setQuery] = useState("");
    const { searchResults } = useSignupAnimeSearch(query);

    return (
        <div className="space-y-3">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search anime..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    className="
                w-full
                bg-zinc-900
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                text-white
                text-sm
                lg:text-base
                placeholder-zinc-600
                focus:outline-none
                focus:border-purple-500/60
                transitions
                "
                />
                {query.length > 0 && (
                    <button
                        onClick={() => setQuery("")}
                        className="
                        absolute 
                        right-3 
                        top-1/2 
                        -translate-y-1/2 
                        text-zinc-500 
                        hover:text-white 
                        transition"
                    >
                        ✕
                    </button>
                )}
            </div>
            <div className="
                h-96 
                overflow-y-auto 
                rounded-lg 
                border 
                border-white/20 
                p-2 
                bg-zinc-900/50
                scrollbar-thin
                scrollbar-thumb-purple-500
                ">
                <div className="grid grid-cols-3 gap-2">
                    {searchResults.map((anime) => (
                        <SignUpAnimeCard
                            key={anime.anilistId}
                            {...anime}
                            onClick={() => onSelect(anime)}
                            isSelected={selectedAnimes.some(a => a.anilistId === anime.anilistId)}
                        />
                    ))}
                </div>
                {query.length >= 3 && searchResults.length === 0 && (
                    <p className="text-center text-zinc-500 text-base py-4"> No Results Found :(</p>
                )}
            </div>
        </div>
    )
}