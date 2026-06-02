import type { ListType } from "../../types/ListType"

type ListCardType = {
    list: ListType
}

export const ListCard = ({list}: ListCardType) => {

    return (
        <div className="
        relative rounded-xl 
        overflow-hidden aspect-[3/4] 
        cursor-pointer">
            {list.coverImage 
            ? <img src={list.coverImage} alt={list.name} 
            className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-to-br 
            from-purple-900/50 to-[#1e1e2e]" />
            }
            {/* dark gradient overlay */}
             <div className="
             absolute inset-0 
             bg-gradient-to-t from-black/80
              to-transparent" />
              {/* text  */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-0.5">
                <h3 className="
                text-white font-semibold 
                text-sm sm:text-base line-clamp-2
                "
                >{list.name}</h3>
                <p className="text-white/60 text-xs">
                {list.animeCount} anime</p>
                {/* eventually once social added */}
                <p className="same as above">0 Likes </p>
            </div>
        </div>
    )
}