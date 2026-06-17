import type { EpisodeType } from "../types/EpisodeType"

type EpisodeListType = {
    episodes: EpisodeType[];
}


export const EpisodeData = ({episodes}: EpisodeListType) => {
    if (episodes.length === 0) return (
        <div className="flex flex-col items-center justify-center py-12 text-white/30">
            <p className="text-4xl mb-3">📺</p>
            <p className="text-sm">No episode data available</p>
        </div>
    )

   return (
        <div className="flex flex-col">
            {episodes.map((episode, index) => (
                <div
                    key={episode.episodeNumber}
                    className={`flex items-center gap-4 py-3 ${index < episodes.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                >
                    <span className="text-purple-500/70 text-sm font-semibold min-w-[28px]">
                        {String(episode.episodeNumber).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm truncate">
                            {episode.title ?? `Episode ${episode.episodeNumber}`}
                        </p>
                        {episode.aired && (
                            <p className="text-white/30 text-xs mt-0.5">
                                {new Date(episode.aired).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                        {episode.filler && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-300">Filler</span>
                        )}
                        {episode.recap && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300">Recap</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}