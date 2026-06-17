import type { UserAnimeWithDetails } from "../../types/UserAnimeWithDetails";
import { MyAnimeConatiner } from "../MyAnimeContainer";
import { useState } from "react";

type ProfileAnimeProps = {
    animeEntries: UserAnimeWithDetails[];
}

export const ProfileAnime = ({
    animeEntries
}: ProfileAnimeProps) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const watching = animeEntries.filter(
        item => item.entry.status === "watching"
    );

    const completed = animeEntries.filter(
        item => item.entry.status === "completed"
    );

    const planToWatch = animeEntries.filter(
        item => item.entry.status === "plan-to-watch"
    );

    const favorites = animeEntries.filter(
        item => item.entry.isFavorite
    );

    return (
        <div className="flex flex-col -mt-2">
            {/* sections go here */}
            {expandedSection === "watching" ? (
                <div>
                    <MyAnimeConatiner
                    title="Watching"
                    items={watching.map(item => item.anime)}
                    entries={watching.map(item => item.entry)}
                    mode="grid"
                    readOnly={true}
                    />
                    <div className="flex justify-end mb-4">
                        <button
                        onClick={() => setExpandedSection(null)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                        View Less
                        </button>
                    </div>
                </div>
            ) :
                <MyAnimeConatiner
                title="Watching"
                items={watching.map(item => item.anime)}
                entries={watching.map(item => item.entry)}
                mode="row"
                readOnly={true}
                onViewAll={() => 
                setExpandedSection("watching")
                }
                />
            }
            {expandedSection === "completed" ? (
                <div>
                    <MyAnimeConatiner
                    title="Completed"
                    items={completed.map(item => item.anime)}
                    entries={completed.map(item => item.entry)}
                    mode="grid"
                    readOnly={true}
                    />
                    <div className="flex justify-end mb-4">
                        <button
                        onClick={() => setExpandedSection(null)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                        View Less
                        </button>
                    </div>
                </div>
            ) :
                <MyAnimeConatiner
                title="Completed"
                items={completed.map(item => item.anime)}
                entries={completed.map(item => item.entry)}
                mode="row"
                readOnly={true}
                onViewAll={() => 
                setExpandedSection("completed")
                }
                />
            }
            {expandedSection === "plan-to-watch" ? (
                <div>
                    <MyAnimeConatiner
                    title="Plan to Watch"
                    items={planToWatch.map(item => item.anime)}
                    entries={planToWatch.map(item => item.entry)}
                    mode="grid"
                    readOnly={true}
                    />
                    <div className="flex justify-end mb-4">
                        <button
                        onClick={() => setExpandedSection(null)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                        View Less
                        </button>
                    </div>
                </div>
            ) :
                <MyAnimeConatiner
                title="Plan to Watch"
                items={planToWatch.map(item => item.anime)}
                entries={planToWatch.map(item => item.entry)}
                mode="row"
                readOnly={true}
                onViewAll={() => 
                setExpandedSection("plan-to-watch")
                }
                />
            }
            {expandedSection === "favorites" ? (
                <div>
                    <MyAnimeConatiner
                    title="Favorites" 
                    items={favorites.map(item => item.anime)}
                    entries={favorites.map(item => item.entry)}
                    mode="grid"
                    readOnly={true}
                    />
                    <div className="flex justify-end mb-4">
                        <button
                        onClick={() => setExpandedSection(null)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                        View Less
                        </button>
                    </div>
                </div>
            ) :
                <MyAnimeConatiner
                title="Favorites" 
                items={favorites.map(item => item.anime)}
                entries={favorites.map(item => item.entry)}
                mode="row"
                readOnly={true}
                onViewAll={() => 
                setExpandedSection("favorites")
                }
                />
            }
        </div>
    );
};