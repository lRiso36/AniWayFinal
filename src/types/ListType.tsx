export type ListType = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    coverImage: string | null;
    animeCount: number;
    createdAt: string;
    updatedAt: string;
}