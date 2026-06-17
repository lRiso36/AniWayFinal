import type { ListType } from "../../types/ListType"
import { deleteUserList } from "../../services/userListsService"

type DeleteListModalTypes = {
    isOpen: boolean,
    onClose: () => void,
    list: ListType,
    onSave: () => void
}

export const DeleteListModal = ({ isOpen, onClose, list, onSave }: DeleteListModalTypes) => {
    const handleDelete = async () => {
        try {
            await deleteUserList(list.id);
            onSave();
        } catch (error) {
            console.error(error);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#1e1e2e] rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 flex flex-col gap-4 border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                {/* header */}
                <div className="flex items-center justify-between">
                    <div />
                    <h2 className="text-white font-semibold text-lg sm:text-xl text-center">Delete {list.name}?</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-lg">✕</button>
                </div>

                <p className="text-zinc-300 text-center text-xs sm:text-sm -mt-2 px-4">
                    This will permanently delete {list.name} and all its contents.
                </p>

                <div className="flex flex-col gap-3 bg-white/10 rounded-lg">
                    <div className="flex justify-between px-3 py-2 border-b border-white/10">
                        <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Anime</p>
                        <p className="text-white text-sm sm:text-base">{list.animeCount}</p>
                    </div>
                    <div className="flex justify-between px-3 pb-2 border-b border-white/10">
                        <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Visibility</p>
                        <p className="text-white text-sm sm:text-base">{list.isPublic ? 'Public' : 'Private'}</p>
                    </div>
                    <div className="flex justify-between px-3 pb-2">
                        <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">Ranked</p>
                        <p className="text-white text-sm sm:text-base">{list.isRanked ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                <button
                    onClick={handleDelete}
                    className="w-full bg-red-600 hover:bg-red-500 text-white text-base sm:text-lg font-semibold py-2.5 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}