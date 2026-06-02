import type { AnimeType } from "./AnimeType"

type VoiceActor = {
    id: number
    name: string
    language: string
    image: string | null
}

type Character = {
    id: number
    name: string
    role: string
    image: string | null
    voiceActors: VoiceActor[]
}

export type AnimeDetailType = AnimeType & {
    characters: Character[]
}