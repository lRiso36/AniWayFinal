import { useState, useEffect } from "react";
import { getTopRatedAnime, getTrendingAnime, getTrendingMovies } from "../services/animeGroupService";
import type { AnimeType } from "../types/AnimeType";
import { BrowseRow } from "../components/BrowseComponents/BrowseRow";
import type { UserAnimeEntry } from "../types/UserAnimeEntry";
import { getUserAnime } from "../services/userAnimeService";
import { getHiddenGems } from "../services/animeGroupService";

const genres = [
    "All",
    "Action",
    "Adventure",
    "Avant Garde",
    "Award Winning",
    "Boys Love",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Girls Love",
    "Gourmet",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Suspense"
]

export const Browse = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeGenre, setActiveGenre] = useState("All") ;
    const [trendingAnime, setTrendingAnime] = useState<AnimeType[]>([]);
    const [topRatedAnime, setTopRatedAnime] = useState<AnimeType[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<AnimeType[]>([]);
    const [hiddenGems, setHiddenGems] = useState<AnimeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [animeEntryList, setAnimeEntryList] = useState<{entry: UserAnimeEntry, anime: AnimeType}[]>([]);
    
    const fetchData = async () => {
        setLoading(true)
        const [trending, topRated, movies, gems, userAnime] = await Promise.all([
            getTrendingAnime(),
            getTopRatedAnime(),
            getTrendingMovies(),
            getHiddenGems(),
            getUserAnime()
        ]);
            setTrendingAnime(trending);
            setTopRatedAnime(topRated);
            setTrendingMovies(movies);
            setHiddenGems(gems);
            setAnimeEntryList(userAnime);
            setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const entries = animeEntryList.map(item => item.entry);

    if (loading) return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
    )
    return (
        <div className="min-h-screen bg-[#0a0a14] ">
            <div className="
            max-w-6xl
            mx-auto
            px-4 
            sm:px-8 
            py-8 
            flex 
            flex-col 
            gap-4
            w-full">
                {/* search div */}
                <div className="
                flex items-center gap-3
                bg-[#1e1e2e]
                border border-white/10
                rounded-xl 
                px-4 py-3
                ">
                    {/* search icon */}
                    <svg width="16" height="16" 
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" 
                    className="
                    text-white/30 shrink-0 
                    w-4 h-4 sm:w-5 sm:h-5
                    ">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {setSearchQuery(e.target.value)}}
                        placeholder="Search anime..."
                        className="
                        bg-transparent
                        text-white
                        placeholder-white/30
                        text-sm
                        sm:text-base
                        w-full
                        outline-none
                        "
                    />
                </div>
                <div className="relative">
                    <div className="
                    absolute right-0 
                    top-0 h-full w-12 
                    bg-gradient-to-l from-[#0a0a14] 
                    to-transparent z-10 
                    pointer-events-none" />
                <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setActiveGenre(genre)}
                        className={
                            `px-3 
                            py-1 
                            rounded-full 
                            text-xs 
                            sm:text-sm
                            border 
                            transition-all 
                            shrink-0
                            ${activeGenre === genre
                                ? "bg-purple-500 border-purple-500 text-white"
                                : "border-white/20 text-zinc-400 hover:border-purple-400 hover:text-purple-300"
                            }`}
                            >
                            {genre}
                            </button>
                        ))}
                    </div>
                </div>
                <BrowseRow title="Trending Now" items={trendingAnime} entries={entries} getData={() => fetchData()}/>
                <BrowseRow title="Top Rated" items={topRatedAnime} entries={entries} getData={() => fetchData()}/>
                <BrowseRow title="Movies" items={trendingMovies} entries={entries} getData={() => fetchData()}/>
                <BrowseRow title="Hidden Gems" items={hiddenGems} entries={entries} getData={() => fetchData()}/>
            </div>
        </div>
    )
}