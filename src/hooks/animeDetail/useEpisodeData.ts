// src/hooks/useEpisodeData.ts
import { useState, useEffect } from "react";
import type { EpisodeType } from "../../types/EpisodeType";
import { toastError } from "../../lib/toast";
import { getEpisodeData } from "../../services/episodeDataService";

export const useEpisodeData = (id: string | undefined, tab: string) => {
    const [episodeData, setEpisodeData] = useState<EpisodeType[]>([]);
    const [episodeLoading, setEpisodeLoading] = useState(true);

    const fetchEpisodeData = async () => {
        setEpisodeLoading(true);
        try {
            const data = await getEpisodeData(Number(id));
            setEpisodeData(data ?? []);
        } catch {
            toastError("Failed to get episode data");
        } finally {
            setEpisodeLoading(false);
        }
    };

    useEffect(() => {
        if (tab === 'episodes' && episodeData.length === 0 && id) {
            fetchEpisodeData();
        }
    }, [tab]);

    return { episodeData, episodeLoading };
};