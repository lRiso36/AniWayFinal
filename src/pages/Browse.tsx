import { useState, useEffect } from "react";
import { getTopRatedAnime, getTrendingAnime, getTrendingMovies, getHiddenGems } from "../services/animeGroupService";
import type { AnimeType } from "../types/AnimeType";
import { BrowseRow } from "../components/BrowseComponents/BrowseRow";
import type { UserAnimeEntry } from "../types/UserAnimeEntry";
import { getUserAnime } from "../services/userAnimeService";
import { getAnimebySearch } from "../services/animeService";
import { AnimeCard } from "../components/AnimeCard";
import { getAnimeByGenre } from "../services/animeGenreService";
import { BareLoading, Loading } from "../components/Loading";
import { toastError } from "../lib/toast";


const genres = [
    "All",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
]

export const Browse = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeGenre, setActiveGenre] = useState("All");
    const [trendingAnime, setTrendingAnime] = useState<AnimeType[]>([]);
    const [topRatedAnime, setTopRatedAnime] = useState<AnimeType[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<AnimeType[]>([]);
    const [hiddenGems, setHiddenGems] = useState<AnimeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [animeEntryList, setAnimeEntryList] = useState<{ entry: UserAnimeEntry, anime: AnimeType }[]>([]);
    const [searchResults, setSearchResults] = useState<AnimeType[]>([]);
    const [genreResults, setGenreResults] = useState<AnimeType[]>([]);
    const [genreLoading, setGenreLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);

    const updateEntry = (updated: UserAnimeEntry | null, anilistId: number) => {
        setAnimeEntryList(current => {
            // remove
            if (updated === null) {
                return current.filter(item => item.entry.anilistId !== anilistId)
            }

            // update existing
            if (current.find(item => item.entry.anilistId === anilistId)) {
                return current.map(item =>
                    item.entry.anilistId === anilistId
                        ? { entry: updated, anime: item.anime }
                        : item
                )
            }

            //new entry if anime was in list before
            const animeData =
                trendingAnime.find(a => a.anilistId === anilistId) ||
                topRatedAnime.find(a => a.anilistId === anilistId) ||
                trendingMovies.find(a => a.anilistId === anilistId) ||
                hiddenGems.find(a => a.anilistId === anilistId) ||
                searchResults.find(a => a.anilistId === anilistId) ||
                genreResults.find(a => a.anilistId === anilistId);

            if (!animeData) return current;

            return [...current, { entry: updated, anime: animeData }]
        })
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const [trending, topRated, movies, gems, userAnime] = await Promise.all([
                getTrendingAnime(),
                getTopRatedAnime(),
                getTrendingMovies(),
                getHiddenGems(),
                getUserAnime()
            ]);
            setTrendingAnime(trending || []);
            setTopRatedAnime(topRated || []);
            setTrendingMovies(movies || []);
            setHiddenGems(gems || []);
            setAnimeEntryList(userAnime || []);
        } catch {
            toastError("Unable to get all browsing data.")
        } finally {
            setLoading(false);
        }
    }

    const fetchGenreAnime = async (genre: string) => {
        setGenreLoading(true)
        try {
            const genreAnimes = await getAnimeByGenre(genre);
            setGenreResults(genreAnimes || []);
        } catch {
            toastError(`Unable to get data for ${genre} genre`)
        } finally {
            setGenreLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setSearchLoading(true)
        const timer = setTimeout(async () => {
            try {
                const results = await getAnimebySearch(searchQuery);
                setSearchResults(results);
            } catch {
                toastError("Unable to search for anime right now. Try again later.")
            } finally {
                setSearchLoading(false)
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery])

    //if no anime found, if genre or anime search fials

    useEffect(() => {
        if (activeGenre !== 'All') {
            fetchGenreAnime(activeGenre);
        } else {
            setGenreResults([])
        }
    }, [activeGenre])

    const entries = animeEntryList.map(item => item.entry);

    if (loading) return (
        <Loading loading={loading} />
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
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
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
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
                            ✕
                        </button>
                    )}
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
                {searchQuery.trim() ? (
                    //search mode
                    searchLoading ? (
                        <div className="flex items-center justify-center pt-30">
                            <BareLoading loading={genreLoading} />
                        </div>
                    ) : searchResults?.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                            {searchResults.map((anime) => (
                                <div key={anime.anilistId} className="w-full">
                                    <AnimeCard
                                        anime={anime}
                                        entry={entries.find(e => e.anilistId === anime.anilistId)}
                                        onEntryChange={updateEntry}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-500 text-sm tracking-wide text-center pt-10">
                            No anime found for <span className="text-purple-400">'{searchQuery.trim()}'</span>
                        </p>
                    )
                    ) : activeGenre === 'All' ? (
                        //Browse mode

                        <>
                            {trendingAnime?.length > 0 && (
                                <BrowseRow title="Trending Now" items={trendingAnime} entries={entries} onEntryChange={updateEntry} />
                            )}
                            {topRatedAnime?.length > 0 && (
                                <BrowseRow title="Top Rated" items={topRatedAnime} entries={entries} onEntryChange={updateEntry} />
                            )}
                            {trendingMovies?.length > 0 && (
                                <BrowseRow title="Movies" items={trendingMovies} entries={entries} onEntryChange={updateEntry} />
                            )}
                            {hiddenGems?.length > 0 && (
                                <BrowseRow title="Hidden Gems" items={hiddenGems} entries={entries} onEntryChange={updateEntry} />
                            )}
                        </>
                    ) : (
                    //genre mode
                    genreLoading ? (
                        <div className="flex items-center justify-center pt-30">
                            <BareLoading loading={genreLoading} />
                        </div>
                    ) : genreResults?.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                                {genreResults.map((anime) => (
                                    <div key={anime.anilistId} className="w-full">
                                        <AnimeCard
                                            anime={anime}
                                            entry={entries.find(e => e.anilistId === anime.anilistId)}
                                            onEntryChange={updateEntry}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                                <p className="text-zinc-500 text-sm tracking-wide text-center pt-10">
                                    No anime found for <span className="text-purple-400">{activeGenre}</span>
                                </p>
                            )
                )}

            </div>
        </div>
    )
}