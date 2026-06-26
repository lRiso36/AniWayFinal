import type { AnimeType } from "../types/AnimeType"
import { useState } from "react"
import type { ListType } from "../types/ListType"
import { useAddToList } from "../hooks/lists/useAddToList"

type AddToListModalType = {
    isOpen: boolean,
    onClose: () => void,
    animeToAdd: AnimeType,
    onSave: () => void
    onCreateList: () => void
}

export const AddToListModal = ({ isOpen, onClose, animeToAdd, onSave, onCreateList }: AddToListModalType) => {
    const [currentTab, setCurrentTab] = useState<"public" | "private">("public");
    const [listSearch, setListSearch] = useState('');
    const [listToAdd, setListToAdd] = useState<ListType | null>(null);

    const { userLists, loading, error, handleSave } = useAddToList(
        animeToAdd.anilistId,
        onSave,
        onClose
    );

    const publicLists = userLists?.filter(list => list.isPublic);
    const privateLists = userLists?.filter(list => !list.isPublic);
    const currentLists = currentTab === 'public' ? publicLists : privateLists;
    const filteredLists = currentLists.filter(list =>
        list.name.toLowerCase().includes(listSearch.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#1e1e2e] rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 flex flex-col gap-4 border border-white/10 max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-1 -mb-4">
                    <h2 className="text-white font-semibold text-base">
                        Add '{animeToAdd.title.english ?? animeToAdd.title.romaji}' to lists
                    </h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">✕</button>
                </div>

                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setCurrentTab('public')}
                        className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${currentTab === 'public' ? 'border-purple-500 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                    >
                        Public
                    </button>
                    <button
                        onClick={() => setCurrentTab('private')}
                        className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${currentTab === 'private' ? 'border-purple-500 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                    >
                        Private
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-[#2a2a3e] border border-white/10 rounded-lg px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 shrink-0">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        value={listSearch}
                        onChange={(e) => setListSearch(e.target.value)}
                        placeholder="Search your lists..."
                        className="bg-transparent text-white text-sm placeholder-white/20 outline-none w-full"
                    />
                    {listSearch && (
                        <button onClick={() => setListSearch('')} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-1 max-h-64
                [&::-webkit-scrollbar]:w-1.5 
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-purple-500/50 
                [&::-webkit-scrollbar-thumb]:rounded-full">
                    {loading ? (
                        <div className="flex justify-center py-6">
                            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            <div
                                onClick={() => { onCreateList() }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 border border-dashed border-white/20 transition-colors"
                            >
                                <div className="w-16 h-10 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                                    <span className="text-white/40 text-xl">+</span>
                                </div>
                                <p className="text-white/50 text-sm">Create new list</p>
                            </div>

                            {filteredLists.length === 0 ? (
                                <p className="text-white/30 text-sm text-center py-6">
                                    {listSearch.trim().length > 0 ? `No ${currentTab} lists with '${listSearch.trim()}'` : `No ${currentTab} lists yet`}
                                </p>
                            ) : (
                                filteredLists.map(list => (
                                    <div
                                        key={list.id}
                                        onClick={() => setListToAdd(list.id === listToAdd?.id ? null : list)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${listToAdd?.id === list.id
                                            ? 'bg-purple-600/20 border border-purple-500/40'
                                            : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <div className="flex h-10 w-16 rounded-md overflow-hidden shrink-0">
                                            {list.coverImages?.slice(0, 3).map((img, i) => (
                                                <div key={i} className="flex-1" style={{ marginLeft: i > 0 ? '1px' : 0 }}>
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            {!list.coverImages?.length && (
                                                <div className="flex-1 bg-white/10 rounded-md" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium line-clamp-1">{list.name}</p>
                                            <p className="text-white/40 text-xs">{list.animeCount} anime</p>
                                        </div>
                                        {listToAdd?.id === list.id && (
                                            <span className="text-purple-400 text-sm shrink-0">✓</span>
                                        )}
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>

                {error && (
                    <p className="text-red-400 text-xs text-center">{error}</p>
                )}
                <button
                    onClick={() => handleSave(listToAdd)}
                    className="w-full bg-purple-500 hover:bg-purple-400 text-white text-sm sm:text-base font-semibold py-2 rounded-lg transition-colors"
                >
                    Add to List
                </button>
            </div>
        </div>
    )
}