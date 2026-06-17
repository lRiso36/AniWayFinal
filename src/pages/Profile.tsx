import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getProfile } from "../services/profileService";
import type { ProfileType } from "../types/ProfileType";
import { ProfileHeader } from "../components/ProfileComponents/ProfileHeader";
import { useSearchParams } from "react-router-dom";
import { ProfileNavBar } from "../components/ProfileComponents/ProfileNavBar";
import { ProfileAnime } from "../components/ProfileComponents/ProfileAnimeComponent";
import { followUser, getIsFollowing, unfollowUser } from "../services/followService";
import { useAuth } from "../context/Authcontext";
import { ProfileFollowers } from "../components/ProfileComponents/ProfileFollowers";
import { ProfileFollowing } from "../components/ProfileComponents/ProfileFollowing";
import { ProfileReviews } from "../components/ProfileComponents/ProfileReviews";
import { EditProfileModal } from "../components/ProfileComponents/EditProfileModal";
import { ProfileLists } from "../components/ProfileComponents/ProfileLists";

export const Profile = () => {
    const { username: currentUser } = useAuth();
    const {username} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileType | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const[isFollowing, setIsFollowing] = useState(false);
    const tab = searchParams.get("tab") || "anime";
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEditClick = () => {
        setEditModalOpen(true);
    }

    const handleFollowClick = async () => {
        if (!profileData) return;

        if(isFollowing) {
            await unfollowUser(profileData.id);
            setIsFollowing(false);
            setProfileData(prev => prev ? {...prev, followers: prev.followers - 1} : prev)
        } else {
            await followUser(profileData.id);
            setIsFollowing(true);
            setProfileData(prev => prev ? {...prev, followers: prev.followers + 1} : prev)
        }
    }

    const fetchProfileData = async () => {
        if (!username) return;
        setIsLoading(true)
        const data = await getProfile(username);
        setProfileData(data);
        setIsLoading(false);
    }

    const fetchIsFollowing = async() => {
        if (!username || !profileData) return
        //skip if your own profile
        if (currentUser === username) return
        const result = await getIsFollowing(profileData.id);
        setIsFollowing(result);
    }

    useEffect(() => {
        fetchProfileData();
    }, [username])

    useEffect(() => {
        fetchIsFollowing();
    }, [profileData])

    if (isLoading) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (!profileData) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <p className="text-white/50">Profile not found</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0a0a14] ">
                <div className="
                max-w-6xl
                mx-auto      
                flex 
                flex-col 
                gap-8 
                w-full">
            <ProfileHeader
            profileData={profileData}
            isFollowing={isFollowing}
            onEditClick={
                handleEditClick
            }
            onFollowClick={
                handleFollowClick
            }
            onReviewsClick={() => setSearchParams({tab: 'reviews'})}
            onFollowersClick={() => setSearchParams({ tab: 'followers' })}
            onFollowingClick={() => setSearchParams({ tab: 'following' })}
            />
            <ProfileNavBar />

            <div className="max-w-6xl mx-auto w-full px-4 sm:px-8">
            {tab === "anime" && <div>
                <ProfileAnime 
                animeEntries={profileData.userAnime}
                />
                </div>}
            {tab === "lists" && <ProfileLists userId={profileData.id} />}
            {tab === "reviews" && <ProfileReviews userId={profileData.id}/>}
            {tab === "followers" && <ProfileFollowers userId={profileData.id} />}
            {tab === "following" && <ProfileFollowing userId={profileData.id} />}
            {editModalOpen && profileData && (
    <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profileData={profileData}
        onSave={(updated) => {
            setProfileData(prev => prev ? { ...prev, ...updated } : prev);
        }}
    />
)}
        </div>
        </div>
        </div>
    )
}