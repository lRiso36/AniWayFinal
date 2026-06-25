import { useState, useEffect, useRef } from "react";
import { AnimeCardMenu } from "./AnimeCardMenu";

const MENU_ITEMS = [
    { label: "⭐ Rate & Review", id: "rate-review" },
    { label: "📋 Add to List", id: "list" },
];

type ActionMenuProps = {
    canRemove: boolean;
    onSelect: (id: string) => void;
}

export const ActionMenu = ({ canRemove, onSelect }: ActionMenuProps) => {
    const localMenuRef = useRef<HTMLDivElement>(null);
    const [localMenuOpen, setLocalMenuOpen] = useState(false);
    const [localOpenLeft, setLocalOpenLeft] = useState(false);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (localMenuRef.current && !localMenuRef.current.contains(e.target as Node)) {
                setLocalMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={localMenuRef} className="relative">
            <button
                className="bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base px-3 py-2 rounded-lg transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    if (!localMenuOpen) {
                        const pos = localMenuRef.current?.getBoundingClientRect();
                        if (pos) {
                            setLocalOpenLeft(window.innerWidth - pos.right < 200);
                        }
                    }
                    setLocalMenuOpen(!localMenuOpen);
                }}
            >···</button>
            <AnimeCardMenu
                menuOpen={localMenuOpen}
                openLeft={localOpenLeft}
                items={MENU_ITEMS}
                canRemove={canRemove}
                onClose={() => setLocalMenuOpen(false)}
                onSelect={onSelect}
            />
        </div>
    );
};