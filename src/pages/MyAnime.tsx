import { MyAnimeNavBar } from "../components/MyAnimeNavBar"
import { MyAnimeConatiner } from "../components/MyAnimeContainer"
import { useSearchParams } from "react-router-dom"
import {getUserAnime} from "../services/userAnimeService"
import type { UserAnimeEntry } from "../types/UserAnimeEntry"
import type { AnimeType } from "../types/AnimeType"
import { useState, useEffect } from "react"

export const MyAnime = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [animeList, setAnimeList] = useState<{entry: UserAnimeEntry, anime: AnimeType}[]>([]);
    const tab = searchParams.get("tab") || "overview";
    const fetchAnimeData = async () => {
        setLoading(true)    
        const data = await getUserAnime();
        setAnimeList(data);
        setLoading(false);
    }
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchAnimeData();
    }, []);

    //sort animes
    const watching = animeList.filter(item => item.entry.status === 'watching').map(item => item.anime);
    const completed = animeList.filter(item => item.entry.status === 'completed').map(item => item.anime);
    const planToWatch = animeList.filter(item => item.entry.status === 'plan-to-watch').map(item => item.anime);
    const favorites = animeList.filter(item => item.entry.isFavorite).map(item => item.anime);
    const entries = animeList.map(item => item.entry);
    

    if (loading) return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
    
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
        w-full">
            <h2 className="ml-3 text-white text-2xl font-bold">My Anime</h2>
            <MyAnimeNavBar />
        
        <div>
        {(tab === "overview")
        && (
            <div>
            <MyAnimeConatiner 
            title="Watching" 
            items={watching} 
            mode="row"
            entries={entries}
            onViewAll={() => setSearchParams({tab: "watching"})}
            getData={fetchAnimeData}
            />
            <MyAnimeConatiner 
            title="Completed"   
            items={completed} 
            mode="row"
            entries={entries}
            onViewAll={() => setSearchParams({tab: "completed"})}
            getData={fetchAnimeData}
            />
            <MyAnimeConatiner 
            title="Plan to Watch" 
            items={planToWatch} 
            mode="row"
            entries={entries}
            onViewAll={() => setSearchParams({tab: "plan-to-watch"})}
            getData={fetchAnimeData}
            />
            <MyAnimeConatiner 
            title="Favorites" 
            items={favorites}
            mode="row"
            entries={entries}
            onViewAll={() => setSearchParams({tab: "favorites"})}
            getData={fetchAnimeData}
            />
             </div>
        )
        }
        { (tab === "watching")
        && (
            <div>
                <MyAnimeConatiner 
                title="Watching" 
                items={watching} 
                mode="grid"
                entries={entries}
                onViewAll={() => setSearchParams({tab: "watching"})}
                getData={fetchAnimeData}
                />
            </div>
        )
        }
        { (tab === "completed")
        && (
            <div>
                <MyAnimeConatiner 
                title="Completed"   
                items={completed} 
                mode="grid"
                entries={entries}
                onViewAll={() => setSearchParams({tab: "completed"})}
                getData={fetchAnimeData}
                />
            </div>
        )
        }
        { (tab === "plan-to-watch")
        && (
            <div>
                <MyAnimeConatiner 
                title="Plan to Watch" 
                items={planToWatch} 
                mode="grid"
                entries={entries}
                onViewAll={() => setSearchParams({tab: "plan-to-watch"})}
                getData={fetchAnimeData}
                />
            </div>
        )
        }
        { (tab === "favorites")
        && (
            <div>
                <MyAnimeConatiner 
                title="Favorites" 
                items={favorites}
                mode="grid"
                entries={entries}
                onViewAll={() => setSearchParams({tab: "favorites"})}
                getData={fetchAnimeData}
            />
            </div>
        )
        }
            
            
            
        </div>
        </div>
        </div>
    )
}