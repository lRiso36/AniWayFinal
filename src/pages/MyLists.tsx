import { MyListsNavBar } from "../components/MyListsComponents/MyListsNav";
import { useSearchParams } from "react-router-dom"
import { ListsContainer } from "../components/MyListsComponents/ListContainer";
import type { ListType } from "../types/ListType";
import { useState, useEffect } from "react";
import { getLikedLists, getUserLists } from "../services/userListsService";
import { CreateListModal } from "../components/MyListsComponents/CreateListModal";
import { useAuth } from "../context/Authcontext";
import { Loading } from "../components/Loading";

export const MyLists = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "all-lists";
    const [lists, setLists] = useState<ListType[]>([]);
    const [likedLists, setLikedLists] = useState<ListType[]>([]);
    const [createActive, setCreateActive ] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUserListData = async () => {
        const data = await getUserLists();
        setLists(data);
    }

    const fetchLikedLists = async () => {
        const data = await getLikedLists();
        setLikedLists(data);
        console.log(data);
        console.log(likedLists);
    }

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchUserListData(), fetchLikedLists()])
            setLoading(false);
        }
        fetchAll();
    },[]);

    const saveData = async() => {
        setCreateActive(false);
        await fetchUserListData();
    }

    const handleDelete = (listId: string) => {
        setLists(prev => prev.filter(l => l.id !== listId));
    }
    
    const ownedByMe = lists.filter(list => list.userId === user?.id)

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
                w-full">
                    
                    <div className="flex justify-between">
                        <h2 className="ml-3 text-white text-2xl font-semibold">My Lists</h2>
                        <button className="
                        flex items-center gap-1.5
                        bg-purple-600 hover:bg-purple-500 
                        text-white text-sm sm:text-lg font-medium 
                        px-4 py-2 rounded-lg transition-colors
                        "
                        onClick={()=> setCreateActive(true)}
                        ><span className="text-xl sm:text-2xl font-bold -mt-0.5 sm:-mt-1">+</span> Create List</button>
                    </div>
                    <MyListsNavBar />
                    <div>
                    {tab === "all-lists" && 
                    <div className="flex flex-col gap-4 -mt-4">
                        <ListsContainer 
                        lists={ownedByMe} 
                        title="Owned By Me"
                        onDelete={handleDelete} 
                        onEditSave={fetchUserListData} 
                        />
                        <ListsContainer
                        lists={likedLists} 
                        title="Liked"
                        onDelete={handleDelete} 
                        onEditSave={fetchUserListData} 
                        />
                     </div>
                    }
                    {tab === "owned-by-me" && 
                    <div className="-mt-4 sm:-mt-2">
                    <ListsContainer 
                    lists={ownedByMe} 
                    onDelete={handleDelete} 
                    onEditSave={fetchUserListData}
                    />
                    </div>
                    }
                    {tab === "liked" && 
                    <div className="-mt-4 sm:-mt-2">
                    <ListsContainer 
                    lists={likedLists} 
                    onDelete={handleDelete} 
                    onEditSave={fetchUserListData}
                    />
                    </div>
                    }      
                    </div>
                </div>
            <CreateListModal
            isOpen={createActive}
            onClose={() => setCreateActive(false)}
            onSave={() => 
                saveData()
            }
            />
        </div>
    )
}