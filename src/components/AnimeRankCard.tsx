
type AnimeRankCardType = {
    id: number;
    rank: number;
    title: string;
    score: number;
    image: string;
};

export const AnimeRankCard = ({id, rank, title, score, image}: AnimeRankCardType) => {
    return (
        // main container
        <div className="
            relative
            w-40
            md:w-52
            lg:w-60
            aspect-[2/3]
            flex-shrink-0
            rounded-xl
            overflow-hidden
            cursor-pointer
            group
            border border-white/10
        ">
            {/* image */}
            <img 
                src={image} 
                alt={title} 
                className="
                w-full
                h-full
                object-cover
                group-hover:scale-105
                transition 
                duration-300
                "
            />
                {/* rank badge */}
               <div className="
                absolute
                top-2
                md:top-4
                left-2
                md:left-4
                z-10
                bg-purple-600/70
                px-3.5
                md:px-4.5
                py-1.5
                md:py-2
                rounded-xl
                flex
                items-center
                justify-center
                font-bold
                md:text-base
                lg:text-base
            ">{rank}</div>

            {/* backgorund bottom */}
            <div className="
                absolute
                bottom-0
                left-0
                w-full
                z-10
                p-2
                md:p-3
                bg-black/75
                flex
                flex-col
                gap-1
                md:gap-2
            ">
                <h3 className="
                    font-semibold
                    text-base
                    md:text-lg
                    lg:text-xl
                    truncate
                ">
                {title}
                </h3>
                <p className="
                    text-zinc-300
                    font-medium
                    text-base
                    lg:text-xl
                    whitespace-nowrap
                "><span className="
                    text-purple-400
                    text-2xl
                ">★</span> {score}</p>
            </div>
        </div>
    );
};