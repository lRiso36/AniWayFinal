import type { UserAnimeEntry } from "../types/UserAnimeEntry";

type AnimeCardMenuType = {
    menuOpen: boolean;
    openLeft: boolean;
    entry?: UserAnimeEntry
    onClose: () => void;
    onSelect: (id:string) => void;
}



export const AnimeCardMenu = ({ menuOpen, openLeft, entry, onClose, onSelect }: AnimeCardMenuType) => {
    const MENU_ITEMS = [
      { label: "📺 Log", id: "log" },
      { label: "⭐ Rate & Review", id: "rate-review" },
      { label:
        entry?.isFavorite ? "❤️ Unfavorite" : " ❤️ Add to favorites", 
        id: "favorite" 
      },
      { label: "📋 Add to List", id: "list" },
    ];
  
    if (!menuOpen) return null;

    return (
        <div className={`
              absolute top-8 
              ${openLeft ? "right-0"
                : "left-0"}
              bg-[#1e1e2e] border border-white/10 
              rounded-xl shadow-xl w-48 
              py-1 z-50`}>
                {MENU_ITEMS.map((item) => (
                  <button
                  key={item.id}
                  className="
                  w-full text-left px-4 py-1.5 
                  text-sm text-white/80 hover:bg-white/5 
                  transition-colors"
                  onClick={() => {onSelect(item.id); onClose(); }}
                  > {item.label}</button>
                ))}
                <div className="border-t border-white/10 my-1" />
                  <button 
                  className="w-full text-left px-4 py-1.5 
                  text-sm text-red-400 hover:bg-white/5 transition-colors"
                  onClick={() => {onSelect("remove"); onClose();}}
                  >
                  🗑️ Remove
                  </button>
              </div>
    )
}