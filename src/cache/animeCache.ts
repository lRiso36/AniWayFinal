import type { AnimeType } from "../types/AnimeType"

export const searchCache: Record<string, AnimeType[]> = {}

// check searchCache first
// if not call AniList
// map response to AnimeTYpe[]
//stroe in searchCache
//return results

export const searchAnime = async (query: string): Promise<AnimeType[]> => {
    if (searchCache[query]) return searchCache[query]

    const SEARCH_QUERY = `
    query ($search: String) {
        Page(perPage: 10) {
                media(search: $search, type: ANIME, sort: SCORE_DESC) {
                    id
                    title {
                        english
                        romaji
                    }
                    coverImage {
                        large
                        extraLarge
                    }
                    bannerImage
                    startDate {
                        year
                    }
                    episodes
                    genres
                    description
                }
            }
        }
    `
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: SEARCH_QUERY, variables: { search: query }})
    }
    try {
        const response = await fetch("https://graphql.anilist.co", options)
        const data = await response.json();
        const results: AnimeType[] = data.data.Page.media.map((anime: any) => ({
            anilistId: anime.id,
            title: {
                english: anime.title.english,
                romaji: anime.title.romaji,
            },
            coverImage: {
                large: anime.coverImage.large,
                extraLarge: anime.coverImage.extraLarge,
            },
            bannerImage: anime.bannerImage,
            year: anime.startDate.year,
            episodes: anime.episodes,
            genres: anime.genres,
            description: anime.description,
        }))

        searchCache[query] = results
        return results
    } catch (err) {
        console.error("Failed to search anime:", err)
        return []
    }
}

