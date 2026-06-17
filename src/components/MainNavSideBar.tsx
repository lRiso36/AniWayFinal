// NEED USERNAME AND IFNO AND STUFF FROM DATABASE
import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type MainNavSideBarType = {
  selected?: string;
  onSelect?: (id: string) => void;
  userAvatar: string | null;
  userName: string;
};

// NAVBAR ICONS
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const BrowseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MyAnimeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="m8 21 4-4 4 4" />
    <path d="M10 10l2 2 4-4" />
  </svg>
);

const ListsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

// const CalendarIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="4" width="18" height="18" rx="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );

const FollowingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// const NotificationsIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//     <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//   </svg>
// );

// const MessagesIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//   </svg>
// );

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const AniWayLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polygon points="12,2 22,20 2,20" fill="#7C3AED" />
    <polygon points="12,6 19,19 5,19" fill="#A855F7" opacity="0.5" />
    <circle cx="12" cy="14" r="2" fill="white" />
  </svg>
);

// NAV ITEMS
const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "browse", label: "Browse", icon: <BrowseIcon /> },
  { id: "my-anime", label: "My Anime", icon: <MyAnimeIcon /> },
  { id: "my-lists", label: "Lists", icon: <ListsIcon /> },
  // { id: "calendar", label: "Calendar", icon: <CalendarIcon /> },
  { id: "members", label: "Members", icon: <FollowingIcon /> },
  // { id: "notifications", label: "Notifications", icon: <NotificationsIcon /> },
  // { id: "messages", label: "Messages", icon: <MessagesIcon /> },
  { id: "profile", label: "Profile", icon: <ProfileIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];


export const MainNavSideBar = ({selected:externalSelected, onSelect, userName, userAvatar}:MainNavSideBarType) => {
    // internal is for when no external is passed or interal is controlling it
    const [internalSelected, setInternalSelected] = useState("home")
    // if no external, set to internal 
    const selected = externalSelected ?? internalSelected;
    // only true when screen is not large or greater, allows you to collapse window
    const [manualExpanded, setManualExpanded] = useState(false);
    const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024);

    // everytime you resize, check if its >= large so you can control manual expand
    useEffect(() => {
        const handleResize = () => setIsLarge(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    const expanded = isLarge || manualExpanded

    // on select set id and naviagte to id (navigate being passed from external APPLAYOUT)
    const handleSelect = (id: string) => {
        setInternalSelected(id);
        onSelect?.(id);
    }

    return (
        <nav className={`
            ${expanded ? "w-[200px]" : "w-[60px]"}
            w-[60px] lg:w-[200px] 
            min-h-screen 
            bg-[#0f0f1a] 
            border-r 
            border-white/5 
            flex 
            flex-col 
            font-sans
            transition-all
            duration-300
            `}>
            {/* toggle, if not large, allow toggle for manual expand */}
            <div 
            onClick={() => {if (!isLarge) setManualExpanded(!manualExpanded) }}
            className="
            relative
            group
            flex 
            items-center 
            gap-2 
            px-4 
            py-5
            cursor-pointer 
            hover:bg-white/5 
            transition-colors
            ">
                <span className="shrink-0"><AniWayLogo/></span>
                {expanded && 
                <span className="
                text-white 
                text-lg 
                font-bold
                ">AniWay</span>}
                {!expanded && (
                    <div className=" 
                    absolute left-full top-1/2 -translate-y-1/2 ml-2
                    bg-[#1e1e2e] text-white text-xs px-2 py-1 rounded
                    whitespace-nowrap pointer-events-none
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-150 z-[100]">
                    Expand
                    </div>
                )}
            </div>
            {/* nav items */}
            <ul className="
            flex 
            flex-col 
            gap-0.5 
            px-2 
            flex-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = selected === item.id
                    return (
                        <li key={item.id} className="relative group">
                            <button
                            onClick={() =>handleSelect(item.id)}
                            className={`
                                w-full 
                                flex 
                                items-center 
                                gap-2.5 
                                px-3 
                                py-2 
                                rounded-lg 
                                text-base 
                                transition-colors 
                                cursor-pointer
                                ${isActive
                                ? "bg-purple-600/20 text-purple-400 font-semibold"
                                : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                }`}
                                >
                                <span className="shrink-0">{item.icon}</span>
                                {expanded && (<span className="">{item.label}</span>)}
                            </button>

                            {!expanded && (
                            <div className="
                            absolute left-full top-1/2 -translate-y-1/2 ml-2
                            bg-[#1e1e2e] text-white text-xs px-2 py-1 rounded
                            whitespace-nowrap pointer-events-none
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-150 z-[100]">
                            {item.label}
                            </div>
                            )}
                        </li>
                    )
                })}
            </ul>
            {/* user card on bottom */}
            <div
                onClick={() => handleSelect("profile")}
                className="
                flex 
                items-center 
                gap-2.5 
                px-3 
                py-4 
                border-t 
                border-white/5 
                cursor-pointer 
                hover:bg-white/5 
                transition-colors
                overflow-hidden
                "
                >
                <img 
                src={userAvatar ?? undefined} 
                alt={userName}
                className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                {/* ADD USERNAME INFO AND SHIT FROM DATABSE*/}
                {expanded && (<div className="">
                    <p className="text-white/85 text-[13px] font-medium truncate">{userName}</p>
                    <p className="text-white/35 text-[11px]">View profile</p>
                </div>
              )} 
              </div>
    </nav>
    )
}