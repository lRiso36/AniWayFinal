import type { AnimeType } from "../types/AnimeType";
import type { UserAnimeEntry, UserAnimeStatus } from "../types/UserAnimeEntry";
import { useState, useRef, useEffect } from "react";
import { AnimeCardMenu } from "./AnimeCardMenu";
import { LogModal } from "./LogModal";
import { RemoveModal } from "./RemoveModal";
import { toggleIsFavorite } from "../services/userAnimeService";
import { useNavigate } from "react-router-dom";

type AnimeCardType = {
  anime: AnimeType;
  entry?: UserAnimeEntry;
  getData: () => Promise<void>;
  onStatusChange?: (anilistId: number, status: UserAnimeStatus) => void;
  onRate?: (anilistId: number) => void;
  onReview?: (anilistId: number) => void;
  onFavorite?: (anilistId: number) => void;
  onAddToList?: (anilistId: number) => void;
  onRemove?: (anilistId: number) => void;
};

export const AnimeCard = ({ anime, entry, getData }: AnimeCardType) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openLeft, setOpenLeft] = useState(false);
  const [activeModal, setActiveModal] = useState<'log' | 'favorite' | 'remove' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCLick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)){
        setMenuOpen(false);
      }};
    document.addEventListener("mousedown", handleCLick);
    return () => document.removeEventListener("mousedown", handleCLick);
  }, [])

  const toggleFavorite = async () => {
    try {
      await toggleIsFavorite(anime.anilistId, anime.episodes)
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div  ref={menuRef} className="flex flex-col gap-2 relative">
      {/* cover image */}
      <div className="relative group aspect-[3/4] rounded-lg overflow-hidden"
      onClick={() => navigate(`/anime/${anime.anilistId}`)}
      >
        <img
          src={anime.coverImage.large}
          alt={anime.title.english ?? anime.title.romaji}
          className="w-full h-full object-cover"
          
        />
        <div className="absolute top-1 right-1 z-20">
          
          <button
            onClick={(e) => {
              e.stopPropagation();
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
        <div className="absolute inset-0 
        border-2 border-purple-500 rounded-lg 
        opacity-0 group-hover:opacity-100 
        transition-opacity z-10" />
        </div>
        {/* image overflow hidden closed now */}
              <AnimeCardMenu
              menuOpen={menuOpen}
              openLeft={openLeft}
              entry={entry}
              onClose={() => setMenuOpen(false)}
              onSelect={(id) => {
                if (id === 'log') setActiveModal('log');
                if (id === 'favorite') {
                   toggleFavorite();
                };
                if (id === 'remove') setActiveModal('remove');
              }}
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
        <LogModal
        isOpen={activeModal === 'log'}
        onClose={() => setActiveModal(null)}
        anime={anime}
        currentEntry={entry}
        onSave={() => {
          setActiveModal(null);
          getData();
        }}
        />
        <RemoveModal
        isOpen={activeModal === 'remove'}
        onClose={() => setActiveModal(null)}
        anime={anime}
        currentEntry={entry}
        onSave={() => {
          setActiveModal(null);
          getData();
        }}
        />
    </div>
  );
};