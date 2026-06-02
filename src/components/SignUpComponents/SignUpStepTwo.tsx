// STILL NEED DATABASE STUFF
import type { AnimeType } from "../../types/AnimeType"
import { useState } from "react"

type SignUpStepTwoType = {
    formData: {
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
export const SignUpStepTwo = ({formData, nextStep,setFormData}:SignUpStepTwoType) => {
    const AVATARS: string[]= Array.from(
        { length: 44 }, (_, i) => `/animeAvatars/avatar${i+1}.png`)

    const genres = [  "Action",
    "Adventure",
    "Avant Garde",
    "Award Winning",
    "Boys Love",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Girls Love",
    "Gourmet",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Suspense"
    ];
   
    const [selectedAvatar, setSelectedAvatar] = useState<string>(formData.avatar || AVATARS[0])
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [displayName, setDisplayName] = useState("");

    function handleSubmit() {
        if(displayName.trim()){
       setFormData(prev => ({
            ...prev,
            avatar: selectedAvatar,
            displayName: displayName,
            genre: selectedGenres
        }))
         nextStep();
    }
    }
    
    return (
        <div className="space-y-5">
            <div className="space-y-1">
                {/* avatar */}
                <p className="text-sm font-medium mb-2 text-zinc-300"> Choose your avatar </p>
                <div className="
                h-64 
                overflow-y-auto 
                rounded-lg 
                border 
                border-white/20 
                p-2 
                bg-white/10
                scrollbar-thin
                scrollbar-thumb-purple-500
                ">
                <div className="grid grid-cols-4 gap-2 justify-items-center">
                    {AVATARS.map((avatar, index) => (
                        <button
                            key={index}
                            className={`rounded-full 
                            border-2 
                            p-0.5
                            flex-shrink-0
                            aspect-square
                            transition-all
                            ${
                                selectedAvatar === avatar
                                ? "border-purple-500"
                                : "border-transparent hover:border-purple-300"
                            }
                            `}
                            onClick={() => setSelectedAvatar(avatar)}
                        >
                            <img
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className="
                            w-13 
                            h-13 
                            sm:w-18
                            sm:h-18
                            md:w-20
                            md:h-20
                            rounded-full 
                            object-cover"
                            />
                        </button>
                    ))}
                </div>
                
                </div>
             </div>
             {/* display name */}
             <div>
             <p className="text-sm font-medium mb-2 text-zinc-300">Display Name <span className="text-purple-500">*</span></p>
             <input
                type="text"
                    placeholder="Mikasa Ackerman"
                    className="
                    w-full 
                    bg-zinc-900 
                    border 
                    border-white/10 
                    rounded-xl
                    px-4
                    py-3
                    mt-1
                    text-white
                    text-sm
                    sm:text-base
                    placeholder-zinc-600
                    focus:outline-none
                    focus:border-purple-500/60
                    transition
                    "
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
            />
        </div>
        <div>
            <p className="text-sm font-medium mb-2 text-zinc-300">Favorite Genres</p>
            <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenres(prev =>
                        prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
                        )}
                        className={
                            `px-3 
                            py-1.5 
                            rounded-full 
                            text-sm 
                            sm:text-base
                            lg:text-lg
                            border 
                            transition-all 
                            ${
                        selectedGenres.includes(genre)
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
            "
            style={{
            background: displayName 
            ? "#9333ea" 
            : "rgba(147,51,234,0.3)"
            }}
            disabled={displayName.trim() === ""}
            onClick={handleSubmit}
            >
            Next
            </button>
        </div>
    )
    // avatar, display name, short bio, favorite genres, sub vs dub preference
}