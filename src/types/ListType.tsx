import type { AnimeType } from "./AnimeType";

export type ListType = {
    id: string;
    userId: string;
    name: string;
    description?: string | null;
    isPublic: boolean;
    isRanked: boolean;
    coverImage?: string | null;
    coverImages: string[];
    animeCount: number;
    createdAt?: string;
    updatedAt?: string;
    ownerUsername?: string | null;
}

// when viewing a specific list
export type ListDetailType = ListType & {
    anime: AnimeType[]
}

export type ListAnimeType = {
    listId: string,
    anilistId: number,
    position: number | null,
    addedAt: string;
}

export type ListPreviewType = {
    id: string;
    userId: string;
    name: string;
    isPublic: boolean;
    isRanked: boolean;
    coverImages: string[];
    animeCount: number;
}