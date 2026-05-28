import { MyAnimeNavBar } from "../components/MyAnimeNavBar"
import { MyAnimeConatiner } from "../components/MyAnimeContainer"
import { useSearchParams } from "react-router-dom"
import { DUMMY_WATCHING, DUMMY_COMPLETED, DUMMY_PLAN, DUMMY_ENTRIES } from "../data/MyAnimeDummy"



export const MyAnime = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "overview";
    
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
        w-full">
            <h2 className="ml-3 text-white text-2xl font-bold">My Anime</h2>
            <MyAnimeNavBar />
        
        <div>
        {(tab === "overview")
        && (
            <div>
            <MyAnimeConatiner 
            title="Watching" 
            items={DUMMY_WATCHING} 
            mode="row"
            entries={DUMMY_ENTRIES}
            onViewAll={() => setSearchParams({tab: "watching"})}
            />
            <MyAnimeConatiner 
            title="Completed"   
            items={DUMMY_COMPLETED} 
            mode="row"
            entries={DUMMY_ENTRIES}
            onViewAll={() => setSearchParams({tab: "completed"})}
            />
            <MyAnimeConatiner 
            title="Plan to Watch" 
            items={DUMMY_PLAN} 
            mode="row"
            entries={DUMMY_ENTRIES}
            onViewAll={() => setSearchParams({tab: "plan-to-watch"})}
            />
            <MyAnimeConatiner 
            title="Favorites" 
            items={DUMMY_WATCHING.concat(DUMMY_COMPLETED, DUMMY_PLAN).filter(anime =>
            DUMMY_ENTRIES.find(e => e.anilistId === anime.anilistId)?.isFavorite
            )}
            mode="row"
            entries={DUMMY_ENTRIES}
            onViewAll={() => setSearchParams({tab: "favorites"})}
            />
             </div>
        )
        }
        { (tab === "watching")
        && (
            <div>
                <MyAnimeConatiner 
                title="Watching" 
                items={DUMMY_WATCHING} 
                mode="grid"
                entries={DUMMY_ENTRIES}
                onViewAll={() => setSearchParams({tab: "watching"})}
                />
            </div>
        )
        }
        { (tab === "completed")
        && (
            <div>
                <MyAnimeConatiner 
                title="Completed"   
                items={DUMMY_COMPLETED} 
                mode="grid"
                entries={DUMMY_ENTRIES}
                onViewAll={() => setSearchParams({tab: "completed"})}
                />
            </div>
        )
        }
        { (tab === "plan-to-watch")
        && (
            <div>
                <MyAnimeConatiner 
                title="Plan to Watch" 
                items={DUMMY_PLAN} 
                mode="grid"
                entries={DUMMY_ENTRIES}
                onViewAll={() => setSearchParams({tab: "plan-to-watch"})}
                />
            </div>
        )
        }
        { (tab === "favorites")
        && (
            <div>
                <MyAnimeConatiner 
                title="Favorites" 
                items={DUMMY_WATCHING.concat(DUMMY_COMPLETED, DUMMY_PLAN).filter(anime =>
                DUMMY_ENTRIES.find(e => e.anilistId === anime.anilistId)?.isFavorite
                )}
                mode="grid"
                entries={DUMMY_ENTRIES}
                onViewAll={() => setSearchParams({tab: "favorites"})}
            />
            </div>
        )
        }
            
            
            
        </div>
        </div>
        </div>
    )
}