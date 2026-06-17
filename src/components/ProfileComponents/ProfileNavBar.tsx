import { useSearchParams } from "react-router-dom";

const PROFILE_NAV_ITEMS = [
    { id: "anime", label: "Anime" },
    { id: "lists", label: "Lists" },
    { id: "reviews", label: "Reviews" },
    { id: "followers", label: "Followers" },
    { id: "following", label: "Following" },
]

export const ProfileNavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selected = searchParams.get("tab") || "anime";

    const handleSelect = (id: string) => {
        setSearchParams({ tab: id });
    };

    return (
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-12">
            <div className="flex overflow-x-auto scrollbar-none border-b border-white/10">
                {PROFILE_NAV_ITEMS.map((item) => {
                    const isActive = selected === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`
                                px-3 py-2.5 sm:px-8 text-sm sm:text-xl font-medium
                                transition-colors whitespace-nowrap shrink-0
                                border-b-2 my-2
                                ${isActive
                                    ? "border-purple-500 text-white"
                                    : "border-transparent text-white/40 hover:text-white/70"
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