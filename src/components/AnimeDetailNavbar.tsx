import { useSearchParams } from "react-router-dom";

const ANIME_DETAIL_NAV_ITEMS = [
    { id: "details", label: "Details" },
    { id: "episodes", label: "Episodes" },
    { id: "characters-and-cast", label: "Characters and Cast" },
    { id: "reviews", label: "Reviews" },
]

export const AnimeDetailNavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selected = searchParams.get("tab") || "details";

    const handleSelect = (id: string) => {
        setSearchParams(
            { tab: id },
            {replace: true},
        );
    };

    return (
        <div className="relative w-full mt-6 sm:mt-8">
            <div className="
            absolute right-0 top-0 h-full w-12 
            bg-gradient-to-l from-[#0a0a14] to-transparent 
            z-10 pointer-events-none sm:hidden
            "/>
            <div className="flex gap-1 overflow-x-auto scrollbar-none w-full border-b border-white/10 pb-1">
                {ANIME_DETAIL_NAV_ITEMS.map((item) => {
                    const isActive = selected === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`
                                px-3 py-2 sm:px-4
                                text-sm sm:text-xl
                                font-medium
                                transition-colors
                                whitespace-nowrap
                                shrink-0
                                border-b-2
                                -mb-[1px]
                                ${isActive
                                    ? "border-purple-500 text-white"
                                    : "border-transparent text-white/50 hover:text-white/80"
                                }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}