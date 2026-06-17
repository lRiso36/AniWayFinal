import { useState } from "react";
import type { Character } from "../types/AnimeDetailType";

type CharacterListType = {
    characters: Character[]
}

export const CharacterList = ({ characters }: CharacterListType) => {
    const [language, setLanguage] = useState<'JAPANESE' | 'ENGLISH'>('JAPANESE');

    return (
        <div className="flex flex-col gap-6">
            {/* language filter */}
            <div className="flex gap-2">
                <button
                    onClick={() => setLanguage('JAPANESE')}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm border transition-all ${language === 'JAPANESE' ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20 text-zinc-400'}`}
                >
                    Japanese
                </button>
                <button
                    onClick={() => setLanguage('ENGLISH')}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm border transition-all ${language === 'ENGLISH' ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20 text-zinc-400'}`}
                >
                    English
                </button>
            </div>

            {/* character grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {characters.map((character) => {
                    const voiceActor = character.voiceActors.find(va => va.language === language);
                    return (
                        <div key={character.id} className="bg-white/[0.04] rounded-xl overflow-hidden flex gap-0">
                            {/* character image */}
                            <div className="w-16 sm:w-22 shrink-0 bg-white/10">
                                {character.image
                                    ? <img src={character.image} alt={character.name} className="w-full h-full object-cover aspect-[2/3]" />
                                    : <div className="w-full aspect-[2/3] bg-white/10" />
                                }
                            </div>
                            {/* info */}
                            <div className="flex flex-col justify-between p-2.5 flex-1 min-w-0">
                                <div>
                                    <p className="text-white/90 text-xs sm:text-sm font-medium line-clamp-2">{character.name}</p>
                                    <p className="text-white/35 text-xs mt-0.5 capitalize">{character.role.toLowerCase()}</p>
                                </div>
                                {voiceActor && (
                                    <div className="mt-2 pt-2 border-t border-white/[0.08]">
                                        <p className="text-white/30 text-[10px] sm:text-xs uppercase tracking-wide mb-0.5">
                                            {language === 'JAPANESE' ? 'JP Voice' : 'EN Voice'}
                                        </p>
                                        <p className="text-purple-400 text-xs sm:text-sm cursor-pointer hover:text-purple-300 transition-colors line-clamp-1">
                                            {voiceActor.name} →
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}