import { getFollowing } from "../../services/followService";
import type { FollowUser } from "../../types/FollowUser"
import { useEffect, useState } from "react";
import { toastError } from "../../lib/toast";

export const useProfileFollowing = (userId: string) => {
    const [following, setFollowing] = useState<FollowUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            const fetch = async () => {
                try {
                    const data = await getFollowing(userId);
                    setFollowing(data);
                    setIsLoading(false);
                } catch {
                    toastError("Unable to get following. Try again later.")
                }
            }
            fetch();
        }, [userId]);

    return { following, isLoading };
}