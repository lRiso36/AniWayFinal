import type { ListType } from "../../types/ListType"
import { ListCard } from "./ListCard"

type ListsContainerType = {
    lists: ListType[]
}

export const ListsContainer = ({ lists }: ListsContainerType) => {
    if (lists.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-white/30">
                <p className="text-4xl mb-3 md:text-6xl">📋</p>
                <p className="text-sm md:text-base">No lists here yet</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {lists.map((list) => (
                <ListCard key={list.id} list={list} />
            ))}
        </div>
    )
}