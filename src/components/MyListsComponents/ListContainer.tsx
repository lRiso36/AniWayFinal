import type { ListType } from "../../types/ListType"
import { ListCard } from "./ListCard"
import { useNavigate } from "react-router-dom"

type ListsContainerType = {
    lists: ListType[]
    title?: string
    onDelete?: (listId: string) => void
    onEditSave?: () => void
}

export const ListsContainer = ({ lists, title, onDelete, onEditSave }: ListsContainerType) => {
    const navigate = useNavigate();
    if (lists.length === 0) {
        return (
            <div className="flex flex-col gap-4">
            {title && (
                <h3 className="text-white font-semibold text-base px-1">{title}</h3>
            )}
            <div className="flex flex-col items-center justify-center py-12 text-white/30">
                <p className="text-4xl mb-3 md:text-6xl">📋</p>
                <p className="text-sm md:text-base">No lists here yet</p>
            </div>
        </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {title && (
                <h3 className="text-white font-semibold text-base px-1">{title}</h3>
            )}
            <div className="flex flex-wrap gap-4">
                {lists.map((list) => (
                    <div key={list.id} className="w-[180px]  sm:w-[250px]">
                        <ListCard 
                        list={list} 
                        onDelete={() => onDelete?.(list.id)}
                        onEditSave={onEditSave}
                        onClick={() => navigate(`/lists/${list.id}`)}
                       />
                    </div>
                ))}
            </div>
        </div>
    )
}