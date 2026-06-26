import { useState, useRef, useEffect } from "react";
import { toggleIsFavorite } from "../../services/userAnimeService";
import { toastError } from "../../lib/toast";
import type { AnimeType } from "../../types/AnimeType";
import type { UserAnimeEntry } from "../../types/UserAnimeEntry";

export const useAnimeCard = (
    anime: AnimeType,
    entry: UserAnimeEntry | undefined,
    onEntryChange?: (updated: UserAnimeEntry | null, anilistId: number) => void,
) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const [activeModal, setActiveModal] = useState<'log' | 'favorite' | 'remove' | 'rate-review' | 'list' | 'create-list' | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleMenuOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!menuOpen) {
            const pos = menuRef.current?.getBoundingClientRect();
            if (pos) {
                const spaceOnRight = window.innerWidth - pos.right;
                setOpenLeft(spaceOnRight < 200);
            }
        }
        setMenuOpen(!menuOpen);
    }

    const toggleFavorite = async () => {
        const prev = entry ?? null;
        const optimistic: UserAnimeEntry = entry
            ? { ...entry, isFavorite: !entry.isFavorite }
            : {
                anilistId: anime.anilistId,
                status: 'completed',
                currentEpisode: anime.episodes ?? 0,
                score: null,
                isFavorite: true,
                startDate: null,
                finishDate: null,
            };

        onEntryChange?.(optimistic, anime.anilistId);
        try {
            await toggleIsFavorite(anime.anilistId, anime.episodes);
        } catch {
            onEntryChange?.(prev, anime.anilistId);
            toastError("Failed to update favorite, please try again");
        }
    }

    return {
        menuOpen, setMenuOpen,
        openLeft,
        activeModal, setActiveModal,
        menuRef,
        handleMenuOpen,
        toggleFavorite,
    }
}