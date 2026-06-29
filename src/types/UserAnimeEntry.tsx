export type UserAnimeStatus = "watching" | "completed" | "plan-to-watch";

export type UserAnimeEntry = {
    anilistId: number;
    status: UserAnimeStatus;
    currentEpisode: number;
    score: number | null;
    startDate: string | null;
    finishDate: string | null;
    isFavorite: boolean;
    updatedAt?: string;
}