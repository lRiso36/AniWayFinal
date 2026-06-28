import { MyAnimeNavBar } from "../components/MyAnimeNavBar"
import { MyAnimeConatiner } from "../components/MyAnimeContainer"
import { useSearchParams } from "react-router-dom"
import { Loading } from "../components/Loading"
import { useMyAnime } from "../hooks/anime/useMyAnime"

export const MyAnime = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "overview";
    const {
        loading,
        watching, completed,
        planToWatch, favorites,
        entries, handleEntryChange
    } = useMyAnime()

    if (loading) return (
        <Loading loading={loading} />
    )

    return (
        <div className="min-h-screen bg-[#0a0a14] ">
            <div className="
            max-w-6xl
            mx-auto
            px-4 
            sm:px-8 
            py-8 
            flex 
            flex-col 
            gap-8
            w-full
            ">
                <h2 className="ml-3 text-white text-2xl font-bold">My Anime</h2>
                <MyAnimeNavBar />

                <div>
                    {tab === "overview" && (
                        <div className="-mt-3">
                            <MyAnimeConatiner
                                title="Watching"
                                items={watching}
                                mode="row"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "watching" })}
                                onEntryChange={handleEntryChange}
                            />
                            <MyAnimeConatiner
                                title="Completed"
                                items={completed}
                                mode="row"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "completed" })}
                                onEntryChange={handleEntryChange}
                            />
                            <MyAnimeConatiner
                                title="Plan to Watch"
                                items={planToWatch}
                                mode="row"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "plan-to-watch" })}
                                onEntryChange={handleEntryChange}
                            />
                            <MyAnimeConatiner
                                title="Favorites"
                                items={favorites}
                                mode="row"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "favorites" })}
                                onEntryChange={handleEntryChange}
                            />
                        </div>
                    )}
                    {tab === "watching" && (
                        <div>
                            <MyAnimeConatiner
                                title="Watching"
                                items={watching}
                                mode="grid"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "watching" })}
                                onEntryChange={handleEntryChange}
                            />
                        </div>
                    )}
                    {tab === "completed" && (
                        <div>
                            <MyAnimeConatiner
                                title="Completed"
                                items={completed}
                                mode="grid"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "completed" })}
                                onEntryChange={handleEntryChange}
                            />
                        </div>
                    )}
                    {tab === "plan-to-watch" && (
                        <div>
                            <MyAnimeConatiner
                                title="Plan to Watch"
                                items={planToWatch}
                                mode="grid"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "plan-to-watch" })}
                                onEntryChange={handleEntryChange}
                            />
                        </div>
                    )}
                    {tab === "favorites" && (
                        <div>
                            <MyAnimeConatiner
                                title="Favorites"
                                items={favorites}
                                mode="grid"
                                entries={entries}
                                onViewAll={() => setSearchParams({ tab: "favorites" })}
                                onEntryChange={handleEntryChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}