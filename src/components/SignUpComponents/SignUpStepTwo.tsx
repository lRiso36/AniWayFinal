import type { AnimeType } from "../../types/AnimeType"
import { useState } from "react"
import { Avatar } from "../Avatar"

const AVATARS = Array.from({ length: 44 }, (_, i) => `/animeAvatars/avatar${i + 1}.png`);
const GENRES = [
    "Action", "Adventure", "Avant Garde", "Award Winning", "Boys Love",
    "Comedy", "Drama", "Ecchi", "Fantasy", "Girls Love", "Gourmet",
    "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life",
    "Sports", "Supernatural", "Suspense"
];

type SignUpStepTwoType = {
    formData: {
        username: string
        avatar: string
        displayName: string
        bio: string
        genre: string[]
        favorites: AnimeType[]
    }
    setFormData: React.Dispatch<React.SetStateAction<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        avatar: string;
        displayName: string;
        bio: string;
        genre: string[];
        favorites: AnimeType[]
    }>>;
    nextStep: () => void
    prevStep: () => void
}

export const SignUpStepTwo = ({ formData, nextStep, setFormData, prevStep }: SignUpStepTwoType) => {
    const [selectedAvatar, setSelectedAvatar] = useState<string>(formData.avatar || 'default');
    const [selectedGenres, setSelectedGenres] = useState<string[]>(formData.genre || []);
    const [displayName, setDisplayName] = useState(formData.displayName || "");
    const [tried, setTried] = useState(false);

    function handleSubmit() {
        setTried(true);
        if (!displayName.trim()) return;
        setFormData(prev => ({
            ...prev,
            avatar: selectedAvatar === 'default' ? '' : selectedAvatar,
            displayName: displayName.trim(),
            genre: selectedGenres
        }));
        nextStep();
    }

    return (
        <div className="space-y-5">
            <button
                onClick={prevStep}
                className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors text-sm mb-2 -mt-4"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back
            </button>

            {/* avatar */}
            <div className="space-y-1">
                <p className="text-sm font-medium mb-2 text-zinc-300">Choose your avatar</p>
                <div className="h-64 overflow-y-auto rounded-lg border border-white/20 p-2 bg-white/10 scrollbar-thin scrollbar-thumb-purple-500">
                    <div className="grid grid-cols-4 gap-2 justify-items-center">
                        {/* default letter avatar */}
                        <button
                            className={`rounded-full border-2 p-0.5 flex-shrink-0 aspect-square transition-all
                                ${selectedAvatar === 'default'
                                    ? "border-purple-500"
                                    : "border-transparent hover:border-purple-300"
                                }`}
                            onClick={() => setSelectedAvatar('default')}
                        >
                            <Avatar
                                username={formData.username}
                                size="w-13 h-13 sm:w-18 sm:h-18 md:w-20 md:h-20"
                                textSize="text-xl"
                            />
                        </button>

                        {/* preset avatars */}
                        {AVATARS.map((avatar, index) => (
                            <button
                                key={index}
                                className={`rounded-full border-2 p-0.5 flex-shrink-0 aspect-square transition-all
                                    ${selectedAvatar === avatar
                                        ? "border-purple-500"
                                        : "border-transparent hover:border-purple-300"
                                    }`}
                                onClick={() => setSelectedAvatar(avatar)}
                            >
                                <img
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className="w-13 h-13 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* display name */}
            <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-300">
                    Display Name <span className="text-purple-500">*</span>
                </p>
                {tried && !displayName.trim() && (
                    <p className="text-red-400 text-xs">Display name is required</p>
                )}
                <input
                    type="text"
                    placeholder="Mikasa Ackerman"
                    maxLength={30}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 sm:py-3 mt-1 text-white text-sm sm:text-base placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <p className="text-white/20 text-xs text-right">{displayName.length}/30</p>
            </div>

            {/* genres */}
            <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-300 -mt-3 mb-3">Favorite Genres</p>
                <div className="flex flex-wrap gap-2">
                    {GENRES.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenres(prev =>
                                prev.includes(genre)
                                    ? prev.filter(g => g !== genre)
                                    : [...prev, genre]
                            )}
                            className={`px-3 py-1.5 rounded-full text-sm sm:text-base border transition-all
                                ${selectedGenres.includes(genre)
                                    ? "bg-purple-500 border-purple-500 text-white"
                                    : "border-white/20 text-zinc-400 hover:border-purple-400 hover:text-purple-300"
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            <button
                className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-xl mt-4 transition"
                style={{
                    background: displayName.trim()
                        ? "#9333ea"
                        : "rgba(147,51,234,0.3)"
                }}
                onClick={handleSubmit}
            >
                Next
            </button>
        </div>
    )
}