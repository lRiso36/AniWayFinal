import { useState } from "react";
import { removeAnime } from "../../services/userAnimeService";
import { toastError } from "../../lib/toast";

export const useRemoveAnime = (anilistId: number, onSave: () => void) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await removeAnime(anilistId);
            onSave();
        } catch {
            toastError("Failed to remove anime, please try again");
        } finally {
            setIsRemoving(false);
        }
    }

    return { isRemoving, handleRemove };
}