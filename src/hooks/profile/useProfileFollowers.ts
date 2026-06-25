import { getFollowers } from "../../services/followService";
import type { FollowUser } from "../../types/FollowUser"
import { useEffect, useState } from "react";
import { toastError } from "../../lib/toast";

export const useProfileFollowers = (userId: string) => {
    const [followers, setFollowers] = useState<FollowUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getFollowers(userId);
                setFollowers(data);
            } catch {
                toastError("Unable to get follower data right now.")
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [userId]);

    return { followers, isLoading };
}