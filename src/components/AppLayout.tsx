import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { MainNavSideBar } from "./MainNavSideBar";
import { MainFeed } from "../pages/MainFeed";
import { MyAnime } from "../pages/MyAnime";
import { Browse } from "../pages/Browse";
import { MyLists } from "../pages/MyLists";
import { AnimeDetail } from "../pages/AnimeDetail";

export function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const selected = location.pathname.replace("/", "").toLowerCase() || "home";

    return (
        <div className="flex min-h-screen">
            <div className="hidden sm:block sticky top-0 h-screen">
            <MainNavSideBar
            selected={selected}
            onSelect={(id)=> navigate("/" + id)}
            />
            </div>
            <main className="flex-1 min-w-0 overflow-x-hidden">
            <Routes>
                <Route path="/home" element={<MainFeed />} />
                <Route path="/my-anime" element={<MyAnime/>}></Route>
                <Route path="/browse" element={<Browse/>}></Route>
                <Route path="/my-lists" element={<MyLists/>}></Route>
                <Route path="anime/:id" element={<AnimeDetail/>}></Route>
            </Routes>
            </main>
        </div>
    )
}