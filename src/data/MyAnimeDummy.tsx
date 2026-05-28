import type { AnimeType } from "../types/AnimeType";

export const DUMMY_WATCHING: AnimeType[] = [
  { anilistId: 1, title: { english: "Jujutsu Kaisen", romaji: "Jujutsu Kaisen" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1792/138022.jpg", extraLarge: null }, bannerImage: null, year: 2020, episodes: 24, genres: [], description: null },
  { anilistId: 2, title: { english: "Solo Leveling", romaji: "Solo Leveling" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1829/135190.jpg", extraLarge: null }, bannerImage: null, year: 2024, episodes: 12, genres: [], description: null },
  { anilistId: 3, title: { english: "Demon Slayer", romaji: "Kimetsu no Yaiba" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", extraLarge: null }, bannerImage: null, year: 2019, episodes: 26, genres: [], description: null },
  { anilistId: 4, title: { english: "One Piece", romaji: "One Piece" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", extraLarge: null }, bannerImage: null, year: 1999, episodes: 1103, genres: [], description: null },
  { anilistId: 5, title: { english: "Jujutsu Kaisen", romaji: "Jujutsu Kaisen" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1792/138022.jpg", extraLarge: null }, bannerImage: null, year: 2020, episodes: 24, genres: [], description: null },
  { anilistId: 6, title: { english: "Solo Leveling", romaji: "Solo Leveling" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1829/135190.jpg", extraLarge: null }, bannerImage: null, year: 2024, episodes: 12, genres: [], description: null },
  { anilistId: 7, title: { english: "Demon Slayer", romaji: "Kimetsu no Yaiba" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", extraLarge: null }, bannerImage: null, year: 2019, episodes: 26, genres: [], description: null },
  { anilistId: 8, title: { english: "One Piece", romaji: "One Piece" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", extraLarge: null }, bannerImage: null, year: 1999, episodes: 1103, genres: [], description: null },
];

export const DUMMY_COMPLETED: AnimeType[] = [
  { anilistId: 5, title: { english: "Attack on Titan", romaji: "Shingeki no Kyojin" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", extraLarge: null }, bannerImage: null, year: 2013, episodes: 87, genres: [], description: null },
  { anilistId: 6, title: { english: "Death Note", romaji: "Death Note" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", extraLarge: null }, bannerImage: null, year: 2006, episodes: 37, genres: [], description: null },
  { anilistId: 7, title: { english: "Fullmetal Alchemist", romaji: "Hagane no Renkinjutsushi" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", extraLarge: null }, bannerImage: null, year: 2009, episodes: 64, genres: [], description: null },
  { anilistId: 8, title: { english: "Steins;Gate", romaji: "Steins;Gate" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/5/73199.jpg", extraLarge: null }, bannerImage: null, year: 2011, episodes: 24, genres: [], description: null },
];

export const DUMMY_PLAN: AnimeType[] = [
  { anilistId: 9, title: { english: "Vinland Saga", romaji: "Vinland Saga" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1500/103005.jpg", extraLarge: null }, bannerImage: null, year: 2019, episodes: 24, genres: [], description: null },
  { anilistId: 10, title: { english: "Hunter x Hunter", romaji: "Hunter x Hunter" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg", extraLarge: null }, bannerImage: null, year: 2011, episodes: 148, genres: [], description: null },
  { anilistId: 11, title: { english: "Haikyuu!!", romaji: "Haikyuu!!" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/7/76014.jpg", extraLarge: null }, bannerImage: null, year: 2014, episodes: 85, genres: [], description: null },
  { anilistId: 12, title: { english: "Bleach", romaji: "Bleach" }, coverImage: { large: "https://cdn.myanimelist.net/images/anime/3/40451.jpg", extraLarge: null }, bannerImage: null, year: 2004, episodes: 366, genres: [], description: null },
];

import type { UserAnimeEntry } from "../types/UserAnimeEntry";

export const DUMMY_ENTRIES: UserAnimeEntry[] = [
    { anilistId: 1, status: "watching", currentEpisode: 18, score: null, startDate: "2024-01-01", finishDate: null, isFavorite: false },
    { anilistId: 2, status: "watching", currentEpisode: 7, score: null, startDate: "2024-01-10", finishDate: null, isFavorite: false },
    { anilistId: 3, status: "watching", currentEpisode: 8, score: null, startDate: "2024-02-01", finishDate: null, isFavorite: true },
    { anilistId: 4, status: "watching", currentEpisode: 1103, score: null, startDate: "2020-01-01", finishDate: null, isFavorite: false },
    { anilistId: 5, status: "completed", currentEpisode: 87, score: 10, startDate: "2021-01-01", finishDate: "2023-11-01", isFavorite: true },
    { anilistId: 6, status: "completed", currentEpisode: 37, score: 9, startDate: "2021-03-01", finishDate: "2021-04-01", isFavorite: false },
    { anilistId: 7, status: "completed", currentEpisode: 64, score: 9, startDate: "2021-05-01", finishDate: "2021-07-01", isFavorite: false },
    { anilistId: 8, status: "completed", currentEpisode: 24, score: 10, startDate: "2022-01-01", finishDate: "2022-02-01", isFavorite: true },
    { anilistId: 9, status: "plan-to-watch", currentEpisode: 0, score: null, startDate: null, finishDate: null, isFavorite: false },
    { anilistId: 10, status: "plan-to-watch", currentEpisode: 0, score: null, startDate: null, finishDate: null, isFavorite: false },
    { anilistId: 11, status: "plan-to-watch", currentEpisode: 0, score: null, startDate: null, finishDate: null, isFavorite: false },
    { anilistId: 12, status: "plan-to-watch", currentEpisode: 0, score: null, startDate: null, finishDate: null, isFavorite: false },
];