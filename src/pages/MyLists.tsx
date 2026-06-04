import { MyListsNavBar } from "../components/MyListsComponents/MyListsNav";
import { useSearchParams } from "react-router-dom"
import { ListsContainer } from "../components/MyListsComponents/ListContainer";
import type { ListType } from "../types/ListType";
import { useState, useEffect } from "react";
import { getUserLists } from "../services/userListsService";

export const MyLists = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "all-lists";
    const [lists, setLists] = useState<ListType[]>([]);
    const fetchUserListData = async () => {
        const data = await getUserLists();
        setLists(data);
    }
    useEffect(() => {
        setSearchParams("");
        fetchUserListData();
    },[]);
    // eventually fetch lists

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
                        "><span className="text-xl sm:text-2xl font-bold -mt-0.5 sm:-mt-1">+</span> Create List</button>
                    </div>
                    <MyListsNavBar />
                    <div>
                    {tab === "all-lists" && <ListsContainer lists={lists} />}
                    {tab === "owned-by-me" && <ListsContainer lists={lists} />}
                    {tab === "liked" && <ListsContainer lists={lists} />}      
                    </div>
                </div>
        </div>
    )
}