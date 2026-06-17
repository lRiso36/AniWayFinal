import type { UserAnimeEntry } from "../types/UserAnimeEntry";

type MenuItem = {
    label: string;
    id: string;
}

type AnimeCardMenuType = {
    menuOpen: boolean;
    openLeft: boolean;
    items: MenuItem[];
    canRemove: boolean;
    entry?: UserAnimeEntry
    onClose: () => void;
    onSelect: (id:string) => void;
}



export const AnimeCardMenu = ({ 
  menuOpen, openLeft, items, canRemove, onClose, onSelect 
}: AnimeCardMenuType) => {
  
    if (!menuOpen) return null;

    return (
        <div className={`
              absolute top-8 
              ${openLeft ? "right-0"
                : "left-0"}
              bg-[#1e1e2e] border border-white/10 
              rounded-xl shadow-xl w-48 
              py-1 z-50`}>
                {items.map((item) => (
                  <button
                  key={item.id}
                  className="
                  w-full text-left px-4 py-1.5 
                  text-sm text-white/80 hover:bg-white/5 
                  transition-colors"
                  onClick={() => {onSelect(item.id); onClose(); }}
                  > {item.label}</button>
                ))}
              {canRemove && (
              <>
              <div className="border-t border-white/10 my-1" />
                <button 
                className="w-full text-left px-4 py-1.5 
                text-sm text-red-400 hover:bg-white/5 transition-colors"
                onClick={() => {onSelect("remove"); onClose();}}
                >
                🗑️ Remove
                </button>
              </>
              )}
            </div>
    )
}