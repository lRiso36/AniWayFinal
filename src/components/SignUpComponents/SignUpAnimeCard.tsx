import type { AnimeType } from "../../types/AnimeType"
type SignUpAnimeCardType = AnimeType & {
    onClick: () => void
    isSelected: boolean
}

export const SignUpAnimeCard = ({coverImage, title, onClick, isSelected}: SignUpAnimeCardType) => {

    return (
        <div className={`
        w-full
        relative 
        group 
        rounded-lg 
        overflow-hidden 
        bg-zinc-900
        cursor-pointer 
        hover:border-purple-500/100 
        hover:scale-105
        transition-all
        ${isSelected ? "border-2 border-purple-500" : "border border-white/20"}
        `}
        onClick={onClick} 
        
        >
            <div className="relative aspect-[3/4] w-full">
                <img
                    src={coverImage.large}
                    alt={title.english ?? title.romaji}
                    className="w-full h-full object-cover"
                />
                <div className="
                absolute 
                bottom-0 
                left-0 
                right-0 
                h-12
                bg-gradient-to-t 
                from-zinc-900 
                to-transparent"/>
            </div>
            <div className="px-2 py-1.5 -mt-1">
                <h3 className="
                text-xs 
                lg:text-base
                text-zinc-300
                font-medium
                line-clamp-2
                ">{title.english ?? title.romaji}</h3>
            </div>
        </div>
    )
}
