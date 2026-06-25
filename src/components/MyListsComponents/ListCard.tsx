import { useAuth } from "../../context/Authcontext"
import type { ListType } from "../../types/ListType"
import { useState} from "react"
import { CreateListModal } from "./CreateListModal"
import { DeleteListModal } from "./DeleteListModal"
import { useListCard } from "../../hooks/lists/useListCard"

type ListCardType = {
    list: ListType
    onDelete?: () => void
    onEditSave?: () => void
    onClick?: () => void
}

export const ListCard = ({ list, onDelete, onEditSave, onClick }: ListCardType) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const {
        menuOpen, setMenuOpen,
        editOpen, setEditOpen,
        fullList, setFullList,
        editLoading,
        menuRef,
        handleEditClick
    } = useListCard();

    const { user } = useAuth();

    const isOwner = user?.id === list.userId;

    return (
        <>
            <div
                onClick={onClick}
                className="rounded-xl overflow-hidden cursor-pointer border border-white/8 hover:border-white/20 transition-colors bg-[#12121f]"
            >
                {/* cover images */}
                <div className="flex h-18 sm:h-30">
                    {list.coverImages && list.coverImages.length > 0 ? (
                        <>
                            {list.coverImages.slice(0, 3).map((cover, index) => (
                                <div key={index} className="flex-1" style={{ marginLeft: index > 0 ? '1px' : 0 }}>
                                    <img src={cover} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {list.coverImages.length < 3 && (
                                Array.from({ length: 3 - list.coverImages.length }).map((_, i) => (
                                    <div key={`empty-${i}`} className="flex-1 bg-white/5" style={{ marginLeft: '1px' }} />
                                ))
                            )}
                        </>
                    ) : (
                        <div className="flex-1 bg-white/5 flex items-center justify-center">
                            <p className="text-white/20 text-xs">No anime yet</p>
                        </div>
                    )}
                </div>

                {/* info block */}
                <div className="px-2 py-1.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-semibold line-clamp-1">{list.name}</p>
                        <p className="text-white/40 text-[11px] sm:text-xs mt-0.5">
                            {list.animeCount} anime · {isOwner ? (list.isPublic ? 'Public' : 'Private') : `by ${list.ownerUsername}`}
                        </p>
                    </div>

                    {isOwner && (
                        <div ref={menuRef} className="shrink-0 relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                                className="
                            w-6 h-6 text-xl sm:text-2xl 
                            hover:bg-white/10 
                            rounded-md flex items-center 
                            justify-center text-white/50 
                            hover:text-white transition-colors"
                            >
                                {editLoading ? (
                                    <div className="
                                w-3 h-3 border 
                                border-white/50 
                                border-t-transparent 
                                rounded-full animate-spin
                                " />
                                ) : '···'}
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 bottom-8 bg-[#1e1e2e] border border-white/10 rounded-xl shadow-xl w-36 py-1 z-20">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setMenuOpen(false); handleEditClick(list.id); }}
                                        className="w-full text-left px-4 py-1.5 text-sm text-white/80 hover:bg-white/5 transition-colors"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <div className="border-t border-white/10 my-1" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setDeleteOpen(true) }}
                                        className="w-full text-left px-4 py-1.5 text-sm text-red-400 hover:bg-white/5 transition-colors"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {editOpen && fullList && (
                <CreateListModal
                    isOpen={editOpen}
                    onClose={() => { setEditOpen(false); setFullList(null); }}
                    currentInfo={fullList}
                    onSave={() => {
                        setEditOpen(false);
                        setFullList(null);
                        onEditSave?.();
                    }}
                />
            )}
            <DeleteListModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                list={list}
                onSave={() => {
                    setDeleteOpen(false);
                    onDelete?.();
                }}
            />
        </>
    )
}