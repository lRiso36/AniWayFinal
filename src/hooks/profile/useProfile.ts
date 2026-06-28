// src/hooks/profile/useProfile.ts
import { useState, useEffect } from "react";
import { getProfile } from "../../services/profileService";
import { followUser, getIsFollowing, unfollowUser } from "../../services/followService";
import type { ProfileType } from "../../types/ProfileType";
import { toastError } from "../../lib/toast";

export const useProfile = (username: string | undefined, currentUser: string | null) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileType | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(false);
    const [followStatusError, setFollowStatusError] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    const fetchProfileData = async () => {
        if (!username) return;
        setIsLoading(true);
        try {
            const data = await getProfile(username);
            setProfileData(data);
        } catch {
            toastError("Failed to load profile");
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchIsFollowing = async () => {
        if (!username || !profileData) return;
        if (currentUser === username) return;
        try {
            const result = await getIsFollowing(profileData.id);
            setIsFollowing(result);
        } catch {
            toastError("Failed to load follow status");
            setFollowStatusError(true);
        }
    };

    const handleFollowClick = async () => {
        if (!profileData || isFollowLoading) return;

        const previousIsFollowing = isFollowing;
        const previousProfileData = profileData;

        setIsFollowLoading(true);

        if (isFollowing) {
            setIsFollowing(false);
            setProfileData(prev => prev ? { ...prev, followers: prev.followers - 1 } : prev);
            try {
                await unfollowUser(profileData.id);
            } catch {
                setIsFollowing(previousIsFollowing);
                setProfileData(previousProfileData);
                toastError("Failed to unfollow, please try again");
            }
        } else {
            setIsFollowing(true);
            setProfileData(prev => prev ? { ...prev, followers: prev.followers + 1 } : prev);
            try {
                await followUser(profileData.id);
            } catch {
                setIsFollowing(previousIsFollowing);
                setProfileData(previousProfileData);
                toastError("Failed to follow, please try again");
            }
        }

        setIsFollowLoading(false);
    };

    useEffect(() => {
        fetchProfileData();
    }, [username]);

    useEffect(() => {
        fetchIsFollowing();
    }, [profileData?.id]);

    return {
        isLoading, profileData, setProfileData,
        isFollowing, error, followStatusError,
        handleFollowClick,
    };
};