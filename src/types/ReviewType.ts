export type ReviewType = {
    id: string;
    content: string;
    created_at: string;
    score: number | null;
    anime: {
        anilist_id: number;
        title_english: string | null;
        title_romaji: string;
        cover_large: string;
    };
}

export type AnimeReviewType = {
    id: string;
    content: string;
    created_at: string;
    score: number | null;
    user: {
        id: string;
        username: string;
        display_name: string | null;
        avatar: string | null;
    };
}