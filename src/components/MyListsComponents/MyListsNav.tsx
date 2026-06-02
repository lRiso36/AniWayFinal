import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type MyListsNavItem = {
    id: string;
    label:string;
}

type MyListsNavBar = {
    selected?: string;
}
const MY_LISTS_NAV_ITEMS = [
    {id: "all-lists", label: "All Lists"},
    {id: "owned-by-me", label:"Owned By Me"},
    {id: "liked", label: "Liked"},
]

export const MyListsNavBar = () => {
    const [selectedUrlParams, setSelectedUrlParams] = useSearchParams();
    const selected = selectedUrlParams.get("tab") || "all-lists";

    const handleSelect = (id: string) => {
        setSelectedUrlParams({tab:id});
    };

   return (
    <div className="relative w-full">
    <div className="
    absolute 
    right-0 
    top-0 
    h-full 
    w-12 
    bg-gradient-to-l 
    from-[#0a0a14] 
    to-transparent 
    z-10 
    pointer-events-none
    sm:hidden
    "/>
    <div className="flex gap-1 overflow-x-auto scrollbar-none w-full border-b border-white/10 pb-5">
      {MY_LISTS_NAV_ITEMS.map((item) => {
        const isActive = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`
                px-3 
                py-1.5 
                sm:px-4
                sm:py-2
                rounded-full 
                text-xs 
                sm:text-sm 
                lg:text-lg
                font-medium 
                transition-colors 
                whitespace-nowrap 
                shrink-0
              ${isActive
                ? "bg-purple-600 text-white"
                : "text-white/50 hover:text-white/80"
              }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
    </div>
    )

}