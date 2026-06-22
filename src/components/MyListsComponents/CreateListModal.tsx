import { useState, useEffect } from "react"
import type { ListDetailType } from "../../types/ListType"
import type { AnimeType } from "../../types/AnimeType"
import { getAnimebySearch } from "../../services/animeService"
import { createUserList, updateUserList } from "../../services/userListsService"
import { createPost } from "../../services/postService"
import { TinyLoading } from "../Loading"

type CreatListTypes = {
    isOpen: boolean,
    onClose: () => void,
    currentInfo?: ListDetailType,
    initialAnime? : AnimeType,
    onSave: () => void
}


export const CreateListModal = ({isOpen, currentInfo, initialAnime, onClose, onSave}:CreatListTypes) => {
    const [listData, setListData] = useState({
        name: '' ,
        description: '',
        isPublic: false,
        isRanked: false,
    } )
    const [selectedAnime, setSelectedAnime] = useState<AnimeType[]>([]);
    const [currentTab, setCurrentTab] = useState<"details" | "add">("details");
    const [animeSearch, setAnimeSearch] = useState('');
    const [animeSearchResults, setAnimeSearchResults] = useState<AnimeType[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [shareToFeed, setShareToFeed] = useState(false);
    const [feedCaption, setFeedCaption] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const canSubmit = listData.name.trim().length > 0;

    const detailsTab = (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
            <label className="
            text-white/40 text-xs uppercase tracking-wide"
            >Name <span className="text-purple-500 text-sm">*</span></label>
            <input 
            type="text"
            placeholder="List name..."
            value={listData.name}
            onChange={(e)=> setListData(prev => ({...prev, name: e.target.value}))}
            className="
            bg-[#2a2a3e] text-white 
            text-sm rounded-lg px-3 
            py-2 border border-white/10 
            outline-none placeholder-white/20 
            focus:border-purple-500/50 
            transition-colors"
            />
            </div>
            <div className="flex flex-col gap-1">
                <label className="
                text-white/40 text-xs 
                uppercase tracking-wide"
                >Description</label>
                <textarea
                placeholder="What's this list about?"
                value={listData.description}
                onChange={(e) => setListData(prev => ({...prev, description: e.target.value}))}
                rows={3}
                className="bg-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none placeholder-white/20 focus:border-purple-500/50 transition-colors resize-none"
            />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm">Public</p>
                    <p className="text-white/40 text-xs">Anyone can see this list</p>
                </div>
                <button
                    onClick={() => setListData(prev => ({...prev, isPublic: !prev.isPublic}))}
                    className={`w-10 h-6 rounded-full transition-colors relative ${listData.isPublic ? 'bg-purple-600' : 'bg-white/10'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${listData.isPublic ? 'left-5' : 'left-1'}`} />
                </button>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm">Is Ranked</p>
                    <p className="text-white/40 text-xs">Anime are ordered</p>
                </div>
                <button
                    onClick={() => setListData(prev => ({...prev, isRanked: !prev.isRanked}))}
                    className={`w-10 h-6 rounded-full transition-colors relative ${listData.isRanked ? 'bg-purple-600' : 'bg-white/10'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${listData.isRanked ? 'left-5' : 'left-1'}`} />
                </button>
            </div>
            {!currentInfo && (
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white/80 text-sm">Share to feed</p>
                        <p className="text-white/40 text-xs">Post this list to your feed</p>
                    </div>
                    <button
                    onClick={() => setShareToFeed(prev => !prev)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${shareToFeed ? 'bg-purple-600' : 'bg-white/10'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${shareToFeed ? 'left-5' : 'left-1'}`} />
                    </button>
                </div>
                {shareToFeed && (
                <div className="flex flex-col gap-1">
                    <label className="text-white/40 text-xs uppercase tracking-wide">Caption (optional)</label>
                    <textarea
                    placeholder="Say something about this list..."
                    value={feedCaption}
                    onChange={(e) => setFeedCaption(e.target.value)}
                    rows={2}
                    className="bg-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 border border-white/10 outline-none placeholder-white/20 focus:border-purple-500/50 transition-colors resize-none"
                    />
                </div>
                )}
            </div>


           )}
        </div>
    )

    const addAnimeTab = (
        <div className="flex flex-col gap-4">
        {/* search input */}
            <div className="flex items-center gap-2 bg-[#2a2a3e] border border-white/10 rounded-lg px-3 py-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 shrink-0">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                type="text"
                value={animeSearch}
                onChange={(e) => setAnimeSearch(e.target.value)}
                placeholder="Search anime to add..."
                className="
                bg-transparent text-white 
                text-sm placeholder-white/20 
                outline-none w-full"
                />
                {animeSearch && (
                <button onClick={() => setAnimeSearch('')} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
                    ✕
                </button>
                )}
            </div>

            {animeSearchResults.length > 0 && (
            <div className="flex flex-col border border-white/10 
            rounded-lg overflow-hidden max-h-60 overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-purple-500/50 
            [&::-webkit-scrollbar-thumb]:rounded-full
            ">
                {animeSearchResults.slice(0, 10).map((anime) => {
                    const alreadyAdded = selectedAnime.some(a => a.anilistId === anime.anilistId);
                    return (
                        <div key={anime.anilistId} className="
                        flex items-center gap-3 
                        px-3 py-2 hover:bg-white/5 
                        transition-colors border-b 
                        border-white/[0.06] last:border-0
                        ">
                            <img 
                            src={anime.coverImage.large} 
                            alt={anime.title.english ?? anime.title.romaji} 
                            className="
                            w-8 h-11 object-cover rounded flex-shrink-0
                            " />
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-xs font-medium line-clamp-1">{anime.title.english ?? anime.title.romaji}</p>
                                <p className="text-white/40 text-xs">{anime.year} · {anime.episodes ?? '?'} eps</p>
                            </div>
                            <button
                                onClick={() => {
                                    if (!alreadyAdded) setSelectedAnime(prev => [...prev, anime]);
                                }}
                                disabled={alreadyAdded}
                                className={`text-xs px-2.5 py-1 rounded-md transition-colors shrink-0 ${alreadyAdded ? 'bg-white/10 text-white/30' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
                            >
                                {alreadyAdded ? 'Added' : '+ Add'}
                            </button>
                        </div>
                    )
                })}
            </div>
        )}

        {searchLoading && (
            <TinyLoading loading={searchLoading} />
        )}

        {/* selected anime */}
        {selectedAnime.length > 0 && (
            <div className="flex flex-col gap-2">
                <p className="text-white/40 text-xs uppercase tracking-wide">Added ({selectedAnime.length})</p>
                <div className="flex flex-col gap-1">
                    {selectedAnime.map((anime, index) => (
                        <div key={anime.anilistId} className="flex items-center gap-3 bg-white/[0.04] rounded-lg px-3 py-2">
                            {listData.isRanked && (
                                <span className="text-purple-500/70 text-xs font-semibold min-w-[20px]">{index + 1}</span>
                            )}
                            <img src={anime.coverImage.large} alt={anime.title.english ?? anime.title.romaji} className="w-7 h-10 object-cover rounded flex-shrink-0" />
                            <p className="text-white/80 text-xs flex-1 min-w-0 line-clamp-1">{anime.title.english ?? anime.title.romaji}</p>
                            <button
                                onClick={() => setSelectedAnime(prev => prev.filter(a => a.anilistId !== anime.anilistId))}
                                className="text-white/30 hover:text-red-400 transition-colors text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {selectedAnime.length === 0 && animeSearchResults.length === 0 && !searchLoading && (
            <div className="flex flex-col items-center justify-center py-8 text-white/20">
                <p className="text-3xl mb-2">🎌</p>
                <p className="text-sm">Search for anime to add</p>
            </div>
        )}
    </div>
)

    const handleSave = async () => {
        setHasSubmitted(true)
        if (!canSubmit) return ;

        try {
            const animeIds = selectedAnime.map(a => a.anilistId);

            if (currentInfo) {
                await updateUserList(
                    currentInfo.id,
                    listData.name,
                    listData.description || null,
                    listData.isPublic,
                    listData.isRanked,
                    animeIds
                );
            } else {
                const newList = await createUserList(
                    listData.name,
                    listData.description || null,
                    listData.isPublic,
                    listData.isRanked,
                    animeIds
                );

                if (shareToFeed && newList) {
                    await createPost(
                        'list', 
                        feedCaption.trim() || null,
                        undefined,
                        newList.id,
                        undefined
                    );
                }
            }
            onSave();
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
    //on close reset everythiing
    if (!isOpen) {
        setListData({
            name: '',
            description: '',
            isPublic: false,
            isRanked: false,
        })
        setSelectedAnime([]);
        setAnimeSearch('');
        setAnimeSearchResults([]);
        setCurrentTab('details');
        setShareToFeed(false);
        setFeedCaption('');
        return;
    };

    setListData({
        name: currentInfo?.name ?? '',
        description: currentInfo?.description ?? '',
        isPublic: currentInfo?.isPublic ?? false,
        isRanked: currentInfo?.isRanked ?? false,
    });
    if (currentInfo && 'anime' in currentInfo) {
        setSelectedAnime(currentInfo.anime);
    } else if (!currentInfo && initialAnime){
        setSelectedAnime([initialAnime]);
    } else {
        setSelectedAnime([]);
    }
    }, [currentInfo, isOpen]);

    useEffect(() => {
        if (!animeSearch.trim()) {
            setAnimeSearchResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setSearchLoading(true);
            const results = await getAnimebySearch(animeSearch);
            setAnimeSearchResults(results);
            setSearchLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [animeSearch]);

    if (!isOpen) return null;
    return (
        <div 
        className="
        fixed inset-0 
        bg-black/60 
        flex items-center 
        justify-center z-50"
        onClick={() => {onClose(); setHasSubmitted(false)}}
        >
            <div 
            className="
            bg-[#1e1e2e] rounded-xl 
            p-4 sm:p-6 w-full max-w-md 
            mx-4 flex flex-col gap-4
            border border-white/10
             max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div className="
                flex items-center justify-between
                 px-1 pb-3 border-b border-white/10
                 ">
                <h2 className="
                text-white font-semibold 
                text-lg">{
                    currentInfo 
                    ? 'Edit List' 
                    : 'Create List'
                    }</h2>
                <button onClick={() => {onClose(); setHasSubmitted(false)}} className="text-white/50 hover:text-white transition-colors">✕</button>
            </div>
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setCurrentTab('details')}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${currentTab === 'details' ? 'border-purple-500 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                >
                    Details
                </button>
                <button
                    onClick={() => setCurrentTab('add')}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${currentTab === 'add' ? 'border-purple-500 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                >
                    Add Anime {selectedAnime.length > 0 && <span className="text-purple-400 text-xs ml-1">({selectedAnime.length})</span>}
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-1 scrollbar-none min-h-0">
                {currentTab === 'details' ? detailsTab : addAnimeTab}
            </div>
            {/* footer */}
            {hasSubmitted && !canSubmit && (
                    <p className="text-red-400 text-xs">Name field is empty</p>
            )}
            <div className="flex gap-2 px-1 pt-4 border-t border-white/10">
                <button
                    onClick={() => {onClose(); setHasSubmitted(false)}}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 text-sm py-2.5 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                    onClick={() => handleSave()}
                >
                    {currentInfo ? 'Save Changes' : 'Create List'}
                </button>
            </div>
            </div>

        </div>
    )
}