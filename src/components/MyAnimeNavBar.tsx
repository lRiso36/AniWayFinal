import { useSearchParams } from "react-router-dom";

type MyAnimeNavBar = {
    selected?: string;
}
const MY_ANIME_NAV_ITEMS = [
    {id: "overview", label: "Overview"},
    {id: "watching", label:"Watching"},
    {id: "completed", label: "Completed"},
    {id: "plan-to-watch", label:"Plan To Watch"},
    {id: "favorites", label: "Favorites"}
]

export const MyAnimeNavBar = () => {
    const [selectedUrlParams, setSelectedUrlParams] = useSearchParams();
    const selected = selectedUrlParams.get("tab") || "overview";

    const handleSelect = (id: string) => {
        setSelectedUrlParams({tab:id});
    };

   return (
    <div className="relative w-full">
    <div className="
    absolute 
    right-0 
    top-0 
    h-full 
    w-12 
    bg-gradient-to-l 
    from-[#0a0a14] 
    to-transparent 
    z-10 
    pointer-events-none
    sm:hidden
    "/>
    <div className="flex gap-1 overflow-x-auto scrollbar-none w-full border-b border-white/10 pb-5">
      {MY_ANIME_NAV_ITEMS.map((item) => {
        const isActive = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`
                px-3 
                py-1.5 
                sm:px-4
                sm:py-2
                rounded-full 
                text-xs 
                sm:text-sm 
                lg:text-lg
                font-medium 
                transition-colors 
                whitespace-nowrap 
                shrink-0
              ${isActive
                ? "bg-purple-600 text-white"
                : "text-white/50 hover:text-white/80"
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