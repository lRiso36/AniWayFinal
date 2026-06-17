import type { AnimeDetailType } from "../types/AnimeDetailType";

type AnimeInfoType = {
    animeDetails: AnimeDetailType;
}

export const AnimeInfo = ({ animeDetails }: AnimeInfoType) => {
    const animationStudio = animeDetails.studios.find(s => s.isAnimationStudio)?.name
        ?? animeDetails.studios[0]?.name
        ?? null;

    const formatDate = (date: { year: number | null, month: number | null, day: number | null } | null) => {
        if (!date?.year) return null;
        if (!date.month) return `${date.year}`;
        const d = new Date(date.year, date.month - 1, date.day ?? 1);
        return d.toLocaleDateString('en-US', { month: 'short', day: date.day ? 'numeric' : undefined, year: 'numeric' });
    }

    const startDate = formatDate(animeDetails.startDate);
    const endDate = formatDate(animeDetails.endDate);

    const season = animeDetails.season && animeDetails.seasonYear
        ? `${animeDetails.season.charAt(0) + animeDetails.season.slice(1).toLowerCase()} ${animeDetails.seasonYear}`
        : null;

    const streamingLinks = animeDetails.externalLinks.filter(link =>
        ['Crunchyroll', 'Netflix', 'Funimation', 'Hidive', 'Amazon Prime Video', 'Disney+', 'Hulu'].includes(link.site)
    );

    return (
        <div>
            <div className="flex flex-col gap-4 mb-5">
                {animationStudio && (
                    <div className="flex items-center gap-3">
                        <p className="text-white/35 text-xs sm:text-sm uppercase tracking-wider shrink-0">
                        Studio
                        </p>
                        <div className="flex-1 border-t border-white/40" />
                        <p className="text-white/85 text-sm sm:text-base text-right">
                        {animationStudio}
                        </p>
                    </div>
                )}
                {animeDetails.source && (
                    <div className="flex items-center gap-3">
                        <p className="text-white/35 text-xs sm:text-sm uppercase tracking-wider shrink-0">
                        Source
                        </p>
                        <div className="flex-1 border-t border-white/40" />
                        <p className="text-white/85 text-sm sm:text-base text-right">
                        {animeDetails.source.replace(/_/g, ' ')}
                        </p>
                    </div>
                )}
                {season && (
                    <div className="flex items-center gap-3">
                        <p className="text-white/35 text-xs sm:text-sm uppercase tracking-wider shrink-0">
                        Season
                        </p>
                        <div className="flex-1 border-t border-white/40" />
                        <p className="text-white/85 text-sm sm:text-base text-right">
                        {season}
                        </p>
                    </div>
                )}
                {startDate && (
                    <div className="flex items-center gap-3">
                        <p className="text-white/35 text-xs sm:text-sm uppercase tracking-wider shrink-0">
                        Start Date
                        </p>
                        <div className="flex-1 border-t border-white/40" />
                        <p className="text-white/85 text-sm sm:text-base text-right">
                        {startDate}
                        </p>
                    </div>
                )}
                {endDate && (
                    <div className="flex items-center gap-3">
                        <p className="text-white/35 text-xs sm:text-sm uppercase tracking-wider shrink-0">
                        End Date
                        </p>
                        <div className="flex-1 border-t border-white/40" />
                        <p className="text-white/85 text-sm sm:text-base text-right">
                        {endDate}
                        </p>
                    </div>
                )}
            </div>

            {streamingLinks.length > 0 && (
                <div>
                    <p className="text-white/35 text-xs sm:text-sm uppercase tracking-wide mb-3">Where to Watch</p>
                    <div className="flex gap-2 flex-wrap">
                        {streamingLinks.map((link) => (
                            <a
                                key={link.site}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                            >
                                {link.icon && <img src={link.icon} alt={link.site} className="w-4 h-4 rounded-sm" />}
                                {link.site}
                            </a>
                        ))}
                    </div>
                </div>
            )}
            
        </div>
    )
}