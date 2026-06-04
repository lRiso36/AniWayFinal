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



export const SignUpStepThree = ({formData, setFormData, nextStep}: SignUpStepThreeType) => {
    
    const handleSelect = (anime: AnimeType) => {
        setFormData(prev => {
            //is it already selected?
            const alreadySelected = prev.favorites.some(
                a => a.anilistId === anime.anilistId
            );

            //if already sleetced, filter out
            if (alreadySelected) {
                return {
                    ...prev,
                    favorites: prev.favorites.filter(
                        a => a.anilistId !== anime.anilistId
                    )
                }
            } // end of remove anime from favorites

            //if more than 5 dont add
            if (prev.favorites.length >= 5) return prev;

            //add favorites finally
            return {
                ...prev,
                favorites: [...prev.favorites, anime]
            }
        })
    }

    const handleSubmit = () => {
        console.log("submitting favorites:", formData.favorites)
        // setFormData(prev => ({
        //     ...prev,
        //     favorites: formData.favorites
        // }))
        nextStep();
        }

    return (

        <div className="space-y-5">
                <AnimeSearch
                onSelect={handleSelect}
                selectedAnimes={formData.favorites}
                />
                <div>
                    <p className="text-zinc-300 text-base">Selected Animes</p>
            
                    {formData.favorites.length > 0 && (
                    <div>
                        <p className="text-zinc-300 text-sm mb-2">
                        Favorites ({formData.favorites.length}/5)
                        </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {formData.favorites.map((anime) => (
                        <div key={anime.anilistId} className="flex flex-col relative">
                        {/* X button */}
                        <button
                            onClick={() => handleSelect(anime)}
                            className="absolute top-1 right-1 z-10 bg-black/70 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs hover:bg-red-500 transition"
                            >
                            ✕
                        </button>
                        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden">
                            <img
                                src={anime.coverImage.large}
                                alt={anime.title.english ?? anime.title.romaji}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xs text-zinc-300 font-medium line-clamp-2 mt-1">
                            {anime.title.english ?? anime.title.romaji}
                        </h3>
                        </div>
                        ))}
                    </div>
                </div>
                        )}
                        {formData.favorites.length === 0 && (
                            <p className="text-zinc-500 text-base mb-2">
                            No favorites added :(
                            </p>
                        )}

                </div>
                <button
                className="
                w-full 
                py-3 
                sm:py-4
                rounded-xl 
                font-semibold 
                text-white 
                text-sm
                sm:text-xl
                mt-4 
                transition
                bg-purple-500
                "
                onClick={handleSubmit}
                >
                Finish
                </button>
        </div>
    )
}