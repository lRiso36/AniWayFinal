import type { AnimeType } from "../types/AnimeType";
import type { UserAnimeEntry, UserAnimeStatus } from "../types/UserAnimeEntry";
import { useState, useRef, useEffect } from "react";
import { AnimeCardMenu } from "./AnimeCardMenu";

type AnimeCardType = {
  anime: AnimeType;
  entry?: UserAnimeEntry;
  onStatusChange?: (anilistId: number, status: UserAnimeStatus) => void;
  onLogEpisode?: (anilistId: number) => void;
  onRate?: (anilistId: number) => void;
  onReview?: (anilistId: number) => void;
  onFavorite?: (anilistId: number) => void;
  onAddToList?: (anilistId: number) => void;
  onRemove?: (anilistId: number) => void;
};

const STATUSES: { id: UserAnimeStatus; label: string }[] = [
  { id: "watching", label: "Watching" },
  { id: "completed", label: "Completed" },
  { id: "plan-to-watch", label: "Plan to Watch" },
];

export const AnimeCard = ({ anime, entry }: AnimeCardType) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openLeft, setOpenLeft] = useState(false);

  useEffect(() => {
    const handleCLick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)){
        setMenuOpen(false);
      }};
    document.addEventListener("mousedown", handleCLick);
    return () => document.removeEventListener("mousedown", handleCLick);
  }, [])

  return (
    <div  ref={menuRef} className="flex flex-col gap-2 relative">
      {/* cover image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
        <img
          src={anime.coverImage.large}
          alt={anime.title.english ?? anime.title.romaji}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 right-1 z-20">
          <button
            onClick={() => {
              if (!menuOpen) {
                const pos = menuRef.current?.getBoundingClientRect();
                if (pos) {
                  const spaceeOnRight = window.innerWidth - pos.right;
                  setOpenLeft(spaceeOnRight < 200);
                }
              }
              setMenuOpen(!menuOpen)}}
            className="
            w-6
            h-7 
            lg:w-8
            lg:h-9
            flex 
            items-center 
            justify-center 
            text-white 
            bg-black/50 
            hover:bg-black/80 
            transition-colors 
            rounded-md
            group
            "
            >
            <svg width="16" height="16" 
            viewBox="0 0 26 26" fill="currentColor"
            className="lg:w-5 lg:h-5 transition-transform group-hover:scale-125"
            >
              <circle cx="12" cy="4" r="2.5" />
              <circle cx="12" cy="13" r="2.5" />
              <circle cx="12" cy="22" r="2.5" />
            </svg>
            </button>
        </div>
        </div>
        {/* image overflow hidden closed now */}
              <AnimeCardMenu
              menuOpen={menuOpen}
              openLeft={openLeft}
              onClose={() => setMenuOpen(false)}
              />
      {/* title and episode info */}
      <div>
        <p className="-mt-1 ml-1 text-white text-xs sm:text-sm lg:text-base font-medium line-clamp-1">
          {anime.title.english ?? anime.title.romaji}
        </p>
        <p className="ml-1 text-white/50 text-xs">
          {entry
            ? `Ep ${entry.currentEpisode}${anime.episodes ? ` / ${anime.episodes}` : ""}`
            : `${anime.episodes ?? "—"} eps`}
        </p>
      </div>
      {entry?.status === "watching" && anime.episodes && (
        <div className="w-full h-1 bg-white/10 rounded-full">
        <div
        className="h-1 bg-purple-500 rounded-full"
        style={{ width: `${Math.round((entry.currentEpisode / anime.episodes) * 100)}%` }}
        />
        </div>
)}
    </div>
  );
};