import { AnimeSearch } from "./SignUpSearch";
import type { AnimeType } from "../../types/AnimeType";

type SignUpStepThreeType = {
    formData: {
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

export const SignUpStepThree = ({ formData, setFormData, nextStep, prevStep }: SignUpStepThreeType) => {

    const handleSelect = (anime: AnimeType) => {
        setFormData(prev => {
            const alreadySelected = prev.favorites.some(a => a.anilistId === anime.anilistId);

            if (alreadySelected) {
                return {
                    ...prev,
                    favorites: prev.favorites.filter(a => a.anilistId !== anime.anilistId)
                }
            }

            if (prev.favorites.length >= 5) return prev;

            return {
                ...prev,
                favorites: [...prev.favorites, anime]
            }
        })
    }

    return (
        <div className="space-y-5">
            <button
                onClick={prevStep}
                className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors text-sm mb-4 -mt-4"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back
            </button>

            <AnimeSearch
                onSelect={handleSelect}
                selectedAnimes={formData.favorites}
            />

            {/* selected favorites */}
            <div className="space-y-2">
                <p className="text-zinc-300 text-sm">
                    {formData.favorites.length > 0
                        ? `Favorites (${formData.favorites.length}/5)`
                        : 'No favorites added yet'
                    }
                </p>

                {formData.favorites.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {formData.favorites.map((anime) => (
                            <div key={anime.anilistId} className="flex flex-col relative">
                                <button
                                    onClick={() => handleSelect(anime)}
                                    className="absolute top-1 right-1 z-10 bg-black/70 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs hover:bg-red-500 transition"
                                >
                                    ✕
                                </button>
                                <div className="aspect-[3/4] w-full rounded-lg overflow-hidden">
                                    <img
                                        src={anime.coverImage.large}
                                        alt={anime.title.english ?? anime.title.romaji}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-xs text-zinc-300 font-medium line-clamp-2 mt-1">
                                    {anime.title.english ?? anime.title.romaji}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-xl mt-4 transition bg-purple-500 hover:bg-purple-400"
                onClick={nextStep}
            >
                Finish
            </button>
        </div>
    )
}