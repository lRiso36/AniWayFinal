import type { UserAnimeWithDetails } from "./UserAnimeWithDetails"

export type ProfileType = {
    id: string
    username: string
    display_name: string
    bio: string | null
    avatar: string | null
    banner_url: string | null
    is_private: boolean
    created_at: string
    watched: number
    watching: number
    planToWatch: number
    reviews: number
    followers: number,
    following: number,
    userAnime: UserAnimeWithDetails[]
}

