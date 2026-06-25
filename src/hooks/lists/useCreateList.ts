import { useState, useEffect } from "react";
import type { ListDetailType } from "../../types/ListType";
import type { AnimeType } from "../../types/AnimeType";
import { createUserList, updateUserList } from "../../services/userListsService";
import { createPost } from "../../services/postService";
import { toastError, toastSuccess } from "../../lib/toast";

export const useCreateList = (
    isOpen: boolean, 
    currentInfo?: ListDetailType,
    initialAnime?: AnimeType,
    onSave?: () => void
) => {
    const [listData, setListData] = useState({
        name: '',
        description: '',
        isPublic: false,
        isRanked: false,
    })
    const [selectedAnime, setSelectedAnime] = useState<AnimeType[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const canSubmit = listData.name.trim().length > 0;

        useEffect(() => {
        if (!isOpen) {
            setListData({
                name: '',
                description: '',
                isPublic: false,
                isRanked: false,
            })
            setSelectedAnime([]);
            return;
        };

        setListData({
            name: currentInfo?.name ?? '',
            description: currentInfo?.description ?? '',
            isPublic: currentInfo?.isPublic ?? false,
            isRanked: currentInfo?.isRanked ?? false,
        });

        if (currentInfo && 'anime' in currentInfo) {
            setSelectedAnime(currentInfo.anime);
        } else if (!currentInfo && initialAnime) {
            setSelectedAnime([initialAnime]);
        } else {
            setSelectedAnime([]);
        }
    }, [currentInfo, isOpen]);

    const handleSave = async (
        shareToFeed: boolean,
        feedCaption: string,
    ) => {
        if (!canSubmit) return false;

        setIsSaving(true);
        try {
            const animeIds = selectedAnime.map(a => a.anilistId);

            if (currentInfo) {
                await updateUserList(
                    currentInfo.id,
                    listData.name,
                    listData.description || null,
                    listData.isPublic,
                    listData.isRanked,
                    animeIds
                );
            } else {
                const newList = await createUserList(
                    listData.name,
                    listData.description || null,
                    listData.isPublic,
                    listData.isRanked,
                    animeIds
                );

                if (shareToFeed && newList) {
                    try {
                        await createPost(
                            'list',
                            feedCaption.trim() || null,
                            undefined,
                            newList.id,
                            undefined
                        );
                        toastSuccess("Posted to feed ✓")
                    } catch {
                        toastError("List created but failed to post to feed");
                    }
                }
            }
            onSave?.();
            return true;
        } catch {
            toastError("Failed to save list, please try again")
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        listData, setListData,
        selectedAnime, setSelectedAnime,
        isSaving, canSubmit,
        handleSave,
    };
}