export type AnimeType = {
    anilistId: number
    idMal: number | null
    title: {
        english: string | null
        romaji: string
    }
    coverImage: {
        large: string
        extraLarge: string | null
    }
    bannerImage: string | null //hero at top of info page
    year: number | null
    episodes: number | null
    genres: string[]
    description: string | null //comes as HTML from AniList
}