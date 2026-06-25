import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ListDetailType } from "../types/ListType";
import { getListById } from "../services/userListsService";
import { useAuth } from "../context/Authcontext";
import { AnimeCard } from "../components/AnimeCard";
import { CreateListModal } from "../components/MyListsComponents/CreateListModal";
import { useListLike } from "../hooks/useListLike";
import { toastError } from "../lib/toast";
import { Loading } from "../components/Loading";

export const ListDetail = () => {
    const { listId } = useParams();
    const { user } = useAuth();
    const [list, setList] = useState<ListDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);

    const { likeCount, isLiked, handleLike } = useListLike(listId ?? '');

    const fetchList = async () => {
        if (!listId) return;
        
        try {
            const data = await getListById(listId);
            setList(data);
        } catch {
            toastError("Unable to get list data right now. Try again later.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchList();
    }, [listId]);

    const isOwner = user?.id === list?.userId;

    if (loading) return (
        <Loading loading={loading} />
    );

    if (!list) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <p className="text-white/50">List not found</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a14] relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8 w-full">

                {/* header */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => window.history.back()}
                        className="absolute top-4 left-2 w-8 h-8 sm:left-4 sm:w-11 sm:h-11 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                    </button>

                    {/* title row */}
                    <div className="flex items-end justify-between gap-4 mt-5 sm:mt-8">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-white font-bold text-2xl sm:text-3xl">{list.name}</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-white/30 text-sm">{list.animeCount} anime</span>
                                <span className="text-white/20">·</span>
                                <span className="text-white/30 text-sm">{list.isPublic ? 'Public' : 'Private'}</span>
                                {list.isRanked && (
                                    <>
                                        <span className="text-white/20">·</span>
                                        <span className="text-white/30 text-sm">Ranked</span>
                                    </>
                                )}
                                <span className="text-white/20">·</span>
                                <span className="text-white/30 text-sm"> {likeCount} {likeCount === 1 ? `like` : `likes`}</span>
                            </div>
                            {list.description && (
                                <p className="text-white/50 text-sm mt-1">{list.description}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            {!isOwner && (
                                <button
                                    onClick={() => {
                                        handleLike()
                                    }}
                                    className={`flex items-center gap-1.5 px-2 -mb-2 rounded-lg text-xl sm:text-3xl font-medium transition-colors border ${isLiked
                                            ? 'bg-pink-500/20 border-pink-500/30 text-pink-400'
                                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {isLiked ? '♥' : '♡'}
                                </button>
                            )}
                            {isOwner && (
                                <button
                                    onClick={() => setEditOpen(true)}
                                    className="shrink-0 bg-white/10 hover:bg-white/20 
                                text-white text-sm sm:text-base font-medium 
                                px-4 py-2 rounded-lg 
                                transition-colors border 
                                border-white/20"
                                >
                                    Edit List
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* anime grid */}
                {list.anime.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-white/30">
                        <p className="text-4xl mb-3">🎌</p>
                        <p className="text-sm">No anime in this list yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {list.anime.map((anime, index) => (
                            <div key={anime.anilistId} className="flex flex-col gap-1">
                                <AnimeCard
                                    anime={anime}
                                    readOnly={true}
                                />
                                {list.isRanked && (
                                    <p className="text-white/80 text-xs sm:text-base text-center -mt-2 mb-2">{index + 1}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editOpen && (
                <CreateListModal
                    isOpen={editOpen}
                    onClose={() => setEditOpen(false)}
                    currentInfo={list}
                    onSave={() => {
                        setEditOpen(false);
                        fetchList();
                    }}
                />
            )}
        </div>
    );
}