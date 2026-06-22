import { useState, useEffect, useRef} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { AnimeDetailType } from "../types/AnimeDetailType";
import { getAnimeById } from "../services/animeService";
import { getUserAnime, toggleIsFavorite } from "../services/userAnimeService";
import type { UserAnimeEntry } from "../types/UserAnimeEntry";
import { AnimeDetailNavBar } from "../components/AnimeDetailNavbar";
import { getEpisodeData } from "../services/episodeDataService";
import type { EpisodeType } from "../types/EpisodeType";
import { EpisodeData } from "../components/EpisodeData";
import { LogModal } from "../components/LogModal";
import { CharacterList } from "../components/CharacterList";
import { AnimeInfo } from "../components/AnimeInfo";
import { AnimeCardMenu } from "../components/AnimeCardMenu";
import { RemoveModal } from "../components/RemoveModal";
import { RateReviewModal } from "../components/RateReviewModal";
import { AnimeReviews } from "../components/AnimeDetailReviews";
import { AddToListModal } from "../components/AddToListsModal";
import { CreateListModal } from "../components/MyListsComponents/CreateListModal";
import { Loading, MiniLoading } from "../components/Loading";

export const AnimeDetail = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [animeDetails, setAnimeDetails] = useState<AnimeDetailType | null>(null);
    const [loading, setLoading] = useState(true)
    const [entry, setEntry] = useState<UserAnimeEntry | null>(null);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const tab = searchParams.get("tab") || "details";
    const [episodeData, setEpisodeData] = useState<EpisodeType[]>([]);
    const [episodeLoading, setEpisodeLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<'log' | 'remove' | 'rate-review'| 'list' | 'create-list' | null>(null);
    const [showToast, setShowToast] = useState(false);
    const canRemove = entry ? true : false;

    const MENU_ITEMS = [
    { label: "⭐ Rate & Review", id: "rate-review" },
    { label: "📋 Add to List", id: "list" },
    ];

    const fetchEpisodeData = async (id: number) => {
        setEpisodeLoading(true);
        const data = await getEpisodeData(id);
        if (!data) {
            setEpisodeData([]);
        }
        setEpisodeData(data ?? []);
        setEpisodeLoading(false);
    }

    const fetchAnimeDetails = async () => {
        setLoading(true);
        const [details, userAnime] = await Promise.all([
            getAnimeById(Number(id)),
            getUserAnime()
        ])
        setAnimeDetails(details)
        const match = userAnime.find((item: any) => item.anime.anilistId === Number(id))
        setEntry(match?.entry ?? null)
        setLoading(false)
    }


    const toggleFavorite = async () => {
        const wasFavorite = entry?.isFavorite ?? false;

        setEntry(prev =>
            prev
            ? {...prev, isFavorite: !wasFavorite}
            : {
                anilistId: animeDetails!.anilistId,
                status: 'completed',
                currentEpisode: animeDetails!.episodes ?? 0,
                score: null,
                isFavorite: true,
                startDate: null,
                finishDate: null,
            }
        );

        try {
            await toggleIsFavorite(
                animeDetails!.anilistId,
                animeDetails!.episodes
            );
        } catch (error) {
            console.error(error)

            //revert if request fails
            setEntry(prev =>
                prev
                ? {...prev, isFavorite: wasFavorite}
                : null
            )
        } // end catch
      } //end toggle

    //get anime details
    useEffect(() => {
        fetchAnimeDetails();
    }, [])

    //get 

    useEffect(() => {
        if (tab === 'episodes' && episodeData.length === 0 && id) {
            fetchEpisodeData(Number(id));
        }
    }, [tab])

    const cleanDescription = animeDetails?.description
        ?.replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();

    if (loading) return (
        <Loading loading={loading} />
    )

    if (!animeDetails) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <p className="text-white/50">Anime not found</p>
        </div>
    )

    const genreBadges = (
        <div className="flex flex-wrap gap-2 mt-1">
            <span className="bg-white/10 text-white/70 text-xs sm:text-sm px-2 py-1 rounded-md">{animeDetails.year}</span>
            <span className="bg-white/10 text-white/70 text-xs sm:text-sm px-2 py-1 rounded-md">{animeDetails.episodes} Episodes</span>
            {animeDetails.genres.slice(0, 3).map((genre) => (
                <span key={genre} className="bg-purple-500/15 text-purple-300 text-xs sm:text-sm px-2 py-1 rounded-md">{genre}</span>
            ))}
        </div>
    )

    const descriptionBlock = (
        <div className="mt-3 bg-white/[0.03] rounded-xl p-4 mb-4">
            <p className={`text-white/60 text-sm sm:text-base leading-relaxed ${showFullDesc ? '' : 'line-clamp-4'}`}>
                {cleanDescription}
            </p>
            <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-purple-400 text-xs mt-1 hover:text-purple-300"
            >
                {showFullDesc ? 'Show less' : 'Read more'}
            </button>
        </div>
    )

    const actionButtons = (mobile: boolean) => (
        <div className={`flex gap-2 mt-2 ${mobile ? '' : 'hidden sm:flex'}`}>
            <button className="bg-purple-600 text-white text-sm sm:text-base font-bold px-5 py-2 rounded-lg transition-colors">
                {entry ? (entry.status === 'watching' ? 'Watching' : entry.status === 'completed' ? 'Completed' : 'Plan to Watch') : 'Not Added'}
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-bold px-5 py-2 rounded-lg transition-colors"
            onClick={() => setActiveModal('log')}
            >Log</button>
            <button
            onClick={toggleFavorite}
            className={`text-sm sm:text-base px-3 py-2 rounded-lg transition-colors ${
            entry?.isFavorite
            ? 'bg-pink-500/20 text-pink-400'
            : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            >
            {entry?.isFavorite ? '❤️' : '🤍'}
            </button>
            <ActionMenu />
            </div>
    )
    const progressBox = entry && (
        <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-xl p-4 w-56 shrink-0 self-end">
            <p className="text-white font-medium text-sm">Your Progress</p>
            <p className="text-white/50 text-xs">
                Ep {entry.currentEpisode}{animeDetails.episodes ? ` / ${animeDetails.episodes}` : ''}
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full">
                <div
                    className="h-1 bg-purple-500 rounded-full"
                    style={{ width: animeDetails.episodes ? `${Math.round((entry.currentEpisode / animeDetails.episodes) * 100)}%` : '0%' }}
                />
            </div>
            {entry.score && <p className="text-white/50 text-xs">Score: {entry.score} / 10</p>}
        </div>
    )

    const scoreBadge = animeDetails.averageScore && (
    <span className="text-zinc-300 text-sm sm:text-base px-2 py-1 rounded-md flex items-center gap-1 font-semibold">
        <span className="text-purple-500 text-lg" style={{paddingBottom: '1px'}}>★</span> {(animeDetails.averageScore / 10).toFixed(1)}
    </span>
    )

    const ActionMenu = () => {
    const localMenuRef = useRef<HTMLDivElement>(null);
    const [localMenuOpen, setLocalMenuOpen] = useState(false);
    const [localOpenLeft, setLocalOpenLeft] = useState(false);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (localMenuRef.current && !localMenuRef.current.contains(e.target as Node)) {
                setLocalMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={localMenuRef} className="relative">
            <button
                className="bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base px-3 py-2 rounded-lg transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    if (!localMenuOpen) {
                        const pos = localMenuRef.current?.getBoundingClientRect();
                        if (pos) {
                            setLocalOpenLeft(window.innerWidth - pos.right < 200);
                        }
                    }
                    setLocalMenuOpen(!localMenuOpen);
                }}
            >···</button>
            <AnimeCardMenu
                menuOpen={localMenuOpen}
                openLeft={localOpenLeft}
                items={MENU_ITEMS}
                canRemove={canRemove}
                onClose={() => setLocalMenuOpen(false)}
                onSelect={(id) => {
                    if (id === 'remove') setActiveModal('remove');
                    if (id === 'rate-review') setActiveModal('rate-review');
                    if (id === 'list') { setActiveModal('list')}
                }}
            />
        </div>
    );
    };

    return (
        <div className="bg-[#0a0a14] min-h-screen pb-20">
            {/* banner */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
                <img
                    src={animeDetails.bannerImage ?? animeDetails.coverImage.extraLarge ?? ''}
                    alt={animeDetails.title.english ?? animeDetails.title.romaji}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#0a0a14]" />
                <button
                    onClick={() => window.history.back()}
                    className="absolute top-4 left-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </div>

            {/* desktop layout */}
            <div className="hidden md:flex gap-6 max-w-6xl mx-auto px-4 sm:px-8 -mt-16 relative z-10 items-start">
                <img
                    src={animeDetails.coverImage.large}
                    alt={animeDetails.title.english ?? animeDetails.title.romaji}
                    className="w-36 lg:w-44 aspect-[3/4] object-cover rounded-lg shrink-0 shadow-lg"
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0 pb-2">
                    <p className="text-white font-bold text-2xl sm:text-3xl line-clamp-1 pb-1">
                        {animeDetails.title.english ?? animeDetails.title.romaji}
                    </p>
                    {animeDetails.title.romaji && /[\u3000-\u9fff]/.test(animeDetails.title.romaji) && (
                        <p className="text-white/50 text-sm">{animeDetails.title.romaji}</p>
                    )}
                    {genreBadges}
                    {scoreBadge}
                    {descriptionBlock}
                    {actionButtons(false)}
                </div>
                {progressBox}
            </div>

            {/* mobile layout */}
            <div className="md:hidden flex gap-3 max-w-6xl mx-auto px-4 -mt-16 relative z-10 items-start">
                <img
                    src={animeDetails.coverImage.large}
                    alt={animeDetails.title.english ?? animeDetails.title.romaji}
                    className="w-28 aspect-[3/4] object-cover rounded-lg shrink-0 shadow-lg"
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-white font-bold text-lg line-clamp-2">
                        {animeDetails.title.english ?? animeDetails.title.romaji}
                    </p>
                    {animeDetails.title.romaji && /[\u3000-\u9fff]/.test(animeDetails.title.romaji) && (
                        <p className="text-white/40 text-xs">{animeDetails.title.romaji}</p>
                    )}
                    {genreBadges}
                    {scoreBadge}
                </div>
            </div>

            {/* mobile description + buttons */}
            <div className="md:hidden max-w-6xl mx-auto px-4 mt-3">
                <div className="mt-3 mb-6">{descriptionBlock}</div>
                {actionButtons(true)}
            </div>

            {/* navbar */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
                <AnimeDetailNavBar />
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
                {tab === 'details' && (
                    <AnimeInfo animeDetails={animeDetails} />
                    
                )}
                {tab === 'episodes' && (
                    episodeLoading ? (
                    <MiniLoading loading={episodeLoading} />
                    ) : (
                    <EpisodeData episodes={episodeData} />)
                    )
                }
                {tab === 'characters-and-cast' && (
                    <CharacterList characters={animeDetails.characters} />
                )}
                {tab === 'reviews' && (
                    <AnimeReviews animeId={animeDetails.anilistId}/>
                )}
            </div>
            <LogModal
            isOpen={activeModal === 'log'}
            onClose={() => setActiveModal(null)}
            anime={animeDetails}
            currentEntry={entry ?? undefined}
            onSave={(updated) => {
              setActiveModal(null);
              setEntry(updated);
             }}
            />
            <RemoveModal
            isOpen={activeModal === 'remove'}
            onClose={() => setActiveModal(null)}
            anime={animeDetails}
            currentEntry={entry ?? undefined}
            onSave={() => {
            setActiveModal(null);
            setEntry(null);
            }}
            />
            <RateReviewModal
            isOpen={activeModal === 'rate-review'}
            onClose={() => setActiveModal(null)}
            anime={animeDetails}
            currentEntry={entry ?? undefined}
            onSave={(updated) => {
                setActiveModal(null);
                setEntry(updated);
            }}
            onPosted={() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
            }}
            />
            {activeModal === 'list' && (
                <AddToListModal
                isOpen={activeModal === 'list'}
                onClose={() => setActiveModal(null)}
                animeToAdd={animeDetails}
                onSave={() =>
                setActiveModal(null)
                }
                onCreateList={() => setActiveModal('create-list')}
                />
            )}
            {activeModal === 'create-list' && (
                      <CreateListModal
                      isOpen={activeModal === 'create-list'}
                      onClose={() => setActiveModal(null)}
                      initialAnime={animeDetails}
                      onSave={() => setActiveModal(null)}
                      />
            )}

            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-purple-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg">
                Posted to feed ✓
                </div>
            )}
        </div>
    )
}