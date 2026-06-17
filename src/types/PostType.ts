export type PostUser = {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

export type PostType = {
    id: string;
    type: 'rating' | 'review' | 'list' | 'clip' | 'just-because';
    caption: string | null;
    score: number | null;
    created_at: string;
    userInfo: PostUser;
    anime?: {
        anilist_id: number;
        title_english: string | null;
        title_romaji: string;
        cover_large: string;
    };
    list?: {
        id: string;
        name: string;
        coverImages?: string[];
    };
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
}

