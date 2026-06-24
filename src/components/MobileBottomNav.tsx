import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { Avatar } from "./Avatar";

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const BrowseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MyAnimeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="m8 21 4-4 4 4" />
    <path d="M10 10l2 2 4-4" />
  </svg>
);

const ListsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MembersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const MAIN_TABS = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "browse", label: "Browse", icon: <BrowseIcon /> },
  { id: "my-anime", label: "My Anime", icon: <MyAnimeIcon /> },
  { id: "my-lists", label: "Lists", icon: <ListsIcon /> },
  { id: "profile", label: "Profile", icon: <ProfileIcon /> },
];

const MORE_ITEMS = [
  { id: "members", label: "Members", icon: <MembersIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

type Props = {
  userAvatar: string | null;
  userName: string;
};

export const MobileBottomNav = ({ userAvatar, userName }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  const currentPath = location.pathname.replace("/", "").toLowerCase() || "home";

  const handleSelect = (id: string) => {
    setMoreOpen(false);
    if (id === "profile") {
      navigate(`/profile/${username}`);
    } else {
      navigate(`/${id}`);
    }
  };

  const isActive = (id: string) => {
    if (id === "profile") return currentPath.startsWith("profile");
    return currentPath === id;
  };

  return (
    <>
      {/* more sheet backdrop */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* more sheet */}
      <div className={`
        fixed bottom-16 left-0 right-0 z-50
        bg-[#1e1e2e] border-t border-white/10
        rounded-t-2xl
        transition-transform duration-300
        ${moreOpen 
          ? "translate-y-0 visible pointer-events-auto" 
          : "translate-y-full invisible pointer-events-none"}
      `}>
        <div className="px-4 pt-4 pb-4 flex flex-col gap-1">
          <p className="text-white/30 text-xs uppercase tracking-wide px-2 mb-2">More</p>
          {MORE_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors w-full text-left ${
                isActive(item.id)
                  ? "bg-purple-600/20 text-purple-400"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f1a] border-t border-white/5 sm:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {MAIN_TABS.map((tab) => {
            const active = isActive(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                  active ? "text-purple-400" : "text-white/40 hover:text-white/70"
                }`}
              >
                {tab.id === "profile" && userAvatar ? (
                  <Avatar
                  avatar={userAvatar}
                  username={userName}
                  size="w-6 h-6"
                  textSize="text-xs"
                  />

                ) : (
                  <span>{tab.icon}</span>
                )}
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}

          {/* more button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
              moreOpen ? "text-purple-400" : "text-white/40 hover:text-white/70"
            }`}
          >
            <HamburgerIcon />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};