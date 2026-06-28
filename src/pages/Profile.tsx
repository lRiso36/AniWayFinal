import { useState } from "react"
import { useParams } from "react-router-dom";
import { ProfileHeader } from "../components/ProfileComponents/ProfileHeader";
import { useSearchParams } from "react-router-dom";
import { ProfileNavBar } from "../components/ProfileComponents/ProfileNavBar";
import { ProfileAnime } from "../components/ProfileComponents/ProfileAnimeComponent";
import { useAuth } from "../context/Authcontext";
import { ProfileFollowers } from "../components/ProfileComponents/ProfileFollowers";
import { ProfileFollowing } from "../components/ProfileComponents/ProfileFollowing";
import { ProfileReviews } from "../components/ProfileComponents/ProfileReviews";
import { EditProfileModal } from "../components/ProfileComponents/EditProfileModal";
import { ProfileLists } from "../components/ProfileComponents/ProfileLists";
import { Loading } from "../components/Loading";
import { useProfile } from "../hooks/profile/useProfile";

export const Profile = () => {
    const { username: currentUser } = useAuth();
    const { username } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const tab = searchParams.get("tab") || "anime";

    const {
        isLoading, profileData, setProfileData,
        isFollowing, error, followStatusError,
        handleFollowClick,
    } = useProfile(username, currentUser);

    const handleEditClick = () => {
        setEditModalOpen(true);
    }

    if (isLoading) return <Loading loading={isLoading} />

    if (error) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <p className="text-white/50">Failed to load profile</p>
        </div>
    )

    if (!profileData) return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <p className="text-white/50">Profile not found</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0a0a14]">
            <div className="max-w-6xl mx-auto flex flex-col gap-8 w-full">
                <ProfileHeader
                    profileData={profileData}
                    isFollowing={isFollowing}
                    followStatusError={followStatusError}
                    onEditClick={handleEditClick}
                    onFollowClick={handleFollowClick}
                    onReviewsClick={() => setSearchParams({ tab: 'reviews' })}
                    onFollowersClick={() => setSearchParams({ tab: 'followers' })}
                    onFollowingClick={() => setSearchParams({ tab: 'following' })}
                />
                <ProfileNavBar />
                <div className="max-w-6xl mx-auto w-full px-4 sm:px-8">
                    {tab === "anime" && <div><ProfileAnime animeEntries={profileData.userAnime} /></div>}
                    {tab === "lists" && <ProfileLists userId={profileData.id} />}
                    {tab === "reviews" && <ProfileReviews userId={profileData.id} />}
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