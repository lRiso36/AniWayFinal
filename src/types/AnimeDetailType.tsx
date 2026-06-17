import type { AnimeType } from "./AnimeType"

export type VoiceActor = {
    id: number
    name: string
    language: string
    image: string | null
}

export type Character = {
    id: number
    name: string
    role: string
    image: string | null
    voiceActors: VoiceActor[]
}

export type Studio = {
    name: string,
    isAnimationStudio: boolean
}

export type ExternalLink = {
    url: string
    site: string
    icon: string | null
    color: string | null
}

export type AnimeDetailType = AnimeType & {
    characters: Character[]
    studios: Studio[]
    source: string | null
    startDate: { year: number | null, month: number | null, day: number | null } | null
    endDate: { year: number | null, month: number | null, day: number | null } | null
    season: string | null
    seasonYear: number | null
    externalLinks: ExternalLink[]
}