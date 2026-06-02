import type { AnimeType } from "./AnimeType";
import type { UserAnimeEntry } from "./UserAnimeEntry";

export type UserAnimeWithDetails = {
    entry: UserAnimeEntry;
    anime: AnimeType;
}