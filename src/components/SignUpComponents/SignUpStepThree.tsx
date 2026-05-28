import { useState, useEffect } from "react";
import { AnimeSearch } from "./SignUpSearch";
import { SignUpAnimeCard } from "./SignUpAnimeCard";
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
    const [selectedAnimes, setSelectedAnimes] = useState<AnimeType[]>(formData.favorites || []);
    
    const handleSelect = (anime: AnimeType) => {
        if (selectedAnimes.find(a => a.anilistId === anime.anilistId)){
            setSelectedAnimes(prev => prev.filter(a => a.anilistId !== anime.anilistId))
        } else {
            if (selectedAnimes.length >= 5) return
            setSelectedAnimes(prev => [...prev, anime])
        }
    }

    const handleSubmit = () => {
        setFormData(prev => ({
            ...prev,
            favorites: selectedAnimes
        }))
        nextStep();
        }

    return (

        <div className="space-y-5">
                <AnimeSearch
                onSelect={handleSelect}
                selectedAnimes={selectedAnimes}
                />
                <div>
                    <p className="text-zinc-300 text-base">Selected Animes</p>
            
                    {selectedAnimes.length > 0 && (
                    <div>
                        <p className="text-zinc-300 text-sm mb-2">
                        Favorites ({selectedAnimes.length}/5)
                        </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {selectedAnimes.map((anime) => (
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
                        {selectedAnimes.length === 0 && (
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