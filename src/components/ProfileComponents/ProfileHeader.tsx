import type { ProfileType } from "../../types/ProfileType";
import { useAuth } from "../../context/Authcontext";

type ProfileHeaderType = {
  profileData: ProfileType;
  isFollowing: boolean;
  followStatusError: boolean;
  onEditClick: () => void;
  onFollowClick: () => void;
  onFollowersClick: () => void
  onFollowingClick: () => void
  onReviewsClick: () => void
};

export const ProfileHeader = ({
  profileData,
  isFollowing,
  followStatusError,
  onEditClick,
  onFollowClick,
  onFollowersClick,
  onFollowingClick,
  onReviewsClick
}: ProfileHeaderType) => {
  const { username } = useAuth();

  const isOwner = username === profileData.username;

  const joinedDate = new Date(profileData.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col -mb-8">
      {/* banner */}
      <div className="relative w-full h-48 sm:h-56">
        {profileData.banner_url ? (
          <img
            src={profileData.banner_url}
            alt="profile banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/60 to-[#0a0a14]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a14]" />
      </div>

        <div className="max-w-6xl mx-auto w-full px-6 sm:px-12">

            {/* avatar/name/button row */}
            <div className="flex justify-between items-start -mt-20 sm:-mt-24 relative z-10">
                <div className="flex items-end gap-4">
                <img
                  src={profileData.avatar ?? ""}
                  alt={profileData.username}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#0a0a14] bg-[#0a0a14]"
                />

                <div className="pb-2">
                  <p className="text-white font-bold text-xl sm:text-3xl">
                    {profileData.display_name ?? profileData.username}
                  </p>
                  <p className="text-white/40 text-sm sm:text-base">
                    @{profileData.username}
                  </p>
                </div>
            </div>
            </div>

            {/* joined date under avatar */}
            <p className="text-white/30 text-xs sm:text-sm mt-3 flex items-center gap-1">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Joined {joinedDate}
            </p>

            {/* bio underneath */}
            <div className="flex justify-between items-start mt-3 gap-4">
                <div className="flex-1">
                {profileData.bio && (
                <p className="text-white/70 text-sm sm:text-base">
                {profileData.bio}
                </p>
                )}
            </div>

            {/* edit / follow button */}
            {isOwner ? (
            <button
            onClick={onEditClick}
            className="shrink-0 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
            Edit Profile
            </button>
            ) : (
            <button
              onClick={onFollowClick}
              disabled={followStatusError}
              className={`shrink-0 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors group ${
              followStatusError
              ? 'opacity-50 cursor-not-allowed bg-white/10 border border-white/20'
              : isFollowing
              ? 'bg-white/10 hover:bg-white/20 border border-white/20'
              : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
            {followStatusError
            ? 'Unavailable'
            : isFollowing ? (
              <>
              <span className="group-hover:hidden">Following</span>
              <span className="hidden group-hover:inline text-red-400">Unfollow</span>
              </>
            ) : 'Follow'}
            </button>
            )}
        </div>

            {/* stats row */}
            <div className="flex justify-center gap-4
            sm:gap-10 mt-5 sm:pb-10 pb-4 border-b border-white/10 overflow-x-auto">
                <Stat label="Watched" value={profileData.watched} />
                <Stat label="Watching" value={profileData.watching} />
                <Stat label="Reviews" value={profileData.reviews} onClick={onReviewsClick}/>
                <Stat label="Followers" value={profileData.followers} onClick={onFollowersClick}/>
                <Stat label="Following" value={profileData.following} onClick={onFollowingClick}/>
            </div>
        </div>

    </div>
  );
};

const Stat = ({ label, value, onClick }: { label: string; value: number, onClick?: () => void }) => {
  return (
    <div className={`
    flex flex-col items-center text-center shrink-0
    ${onClick ?
      'cursor-pointer group'
      : ''
    }
    `}
    onClick={onClick}
    >
      <p className="text-white font-bold text-lg sm:text-3xl">{value}</p>
      <p className={`text-white/40 text-xs sm:text-base
      ${onClick ? 'text-white/40 group-hover:text-purple-400 transition-colors' : 'text-white/40'}`}
      >{label}</p>
    </div>
  );
};