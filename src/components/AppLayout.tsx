import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { MainNavSideBar } from "./MainNavSideBar";
import { MainFeed } from "../pages/MainFeed";
import { MyAnime } from "../pages/MyAnime";
import { Browse } from "../pages/Browse";
import { MyLists } from "../pages/MyLists";
import { AnimeDetail } from "../pages/AnimeDetail";
import { Profile } from "../pages/Profile";
import { useAuth } from "../context/Authcontext";
import { ListDetail } from "../pages/ListDetail";
import { Settings } from "../pages/Settings";
import { Members } from "../pages/Members";
import { MobileBottomNav } from "./MobileBottomNav";

export function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const {username, avatar} = useAuth();
    const selected = location.pathname.replace("/", "").toLowerCase() || "home";

    return (
        <div className="flex min-h-screen">
            <div className="hidden sm:block sticky top-0 h-screen">
            <MainNavSideBar
            userName={username ?? ''}
            userAvatar={avatar ?? null}
            selected={selected}
            onSelect={(id)=> {
                if (id === 'profile') {
                    navigate(`/profile/${username}`)
                } else {
                    navigate("/" + id)
                }
            }}
            />
            </div>
            <div className="sm:hidden">
            <MobileBottomNav userAvatar={avatar ?? null} userName={username ?? ''} />
            </div>
            <main className="flex-1 min-w-0 overflow-x-hidden pb-16 sm:pb-0">
            <Routes>
                <Route path="/home" element={<MainFeed />} />
                <Route path="/my-anime" element={<MyAnime/>}></Route>
                <Route path="/browse" element={<Browse/>}></Route>
                <Route path="/my-lists" element={<MyLists/>}></Route>
                <Route path="/anime/:id" element={<AnimeDetail/>}></Route>
                <Route path="/profile/:username" element={<Profile/>}></Route>
                <Route path="/lists/:listId" element={<ListDetail />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/members" element={<Members />}></Route>
            </Routes>
            </main>
        </div>
    )
}