import { useState } from "react";
import type { ProfileType } from "../../types/ProfileType";
import { updateProfile } from "../../services/profileService";
import { Avatar } from "../Avatar";
import { useAuth } from "../../context/Authcontext";
import { toastSuccess } from "../../lib/toast";

const AVATAR_COUNT = 44;
const avatars = Array.from({ length: AVATAR_COUNT }, (_, i) => `/animeAvatars/avatar${i + 1}.png`);

type Props = {
    isOpen: boolean;
    onClose: () => void;
    profileData: ProfileType;
    onSave: (updated: Partial<ProfileType>) => void;
}

export const EditProfileModal = ({ isOpen, onClose, profileData, onSave }: Props) => {
    const { username, refreshProfile } = useAuth();
    const [displayName, setDisplayName] = useState(profileData.display_name);
    const [bio, setBio] = useState(profileData.bio ?? '');
    const [avatar, setAvatar] = useState(profileData.avatar ?? '');
    const [bannerUrl, setBannerUrl] = useState(profileData.banner_url ?? '');
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (!displayName.trim()) {
            setError('Display name is required');
            return;
        }
        setSaving(true);
        setError(null);

        const avatarToSave = avatar === 'default' ? '' : avatar
        
        try {
            await updateProfile(
                displayName.trim(),
                bio.trim() || null,
                avatar,
                bannerUrl.trim() || null,
            );
            await refreshProfile();
            onSave({
                display_name: displayName.trim(),
                bio: bio.trim() || null,
                avatar: avatarToSave,
                banner_url: bannerUrl.trim() || null,
            });
            onClose();
            toastSuccess("Profile updated!")
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={onClose}
        >
            <div
                className="bg-[#1e1e2e] border border-white/10 rounded-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#1e1e2e] z-10">
                    <h2 className="text-white font-semibold text-base">Edit Profile</h2>
                    <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors text-xl">✕</button>
                </div>

                <div className="flex flex-col gap-5 p-6">

                    {/* avatar picker */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-xs uppercase tracking-wide">Avatar</label>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full border-2 border-purple-500/50">
                                <Avatar
                                    avatar={avatar}
                                    username={username}
                                    size="w-16 h-16"
                                    textSize="text-2xl pb-1"
                                />
                            </div>
                            <button
                                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                                className="text-sm text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/30 hover:border-purple-500/60 px-3 py-1.5 rounded-lg"
                            >
                                {showAvatarPicker ? 'Close picker' : 'Change avatar'}
                            </button>
                        </div>

                        {showAvatarPicker && (
                            <div className="grid grid-cols-6 gap-2 mt-2 max-h-52 overflow-y-auto pr-1">
                                {/* default avatar */}
                                <div
                                    onClick={() => setAvatar('default')}
                                    className={`w-full aspect-square rounded-full cursor-pointer transition-all hover:scale-105 flex items-center justify-center
                                        ${avatar === 'default'
                                        ? 'ring-2 ring-purple-500 opacity-100'
                                        : 'opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <Avatar
                                        username={username}
                                        size="w-full h-full"
                                        textSize="text-lg"
                                    />
                                </div>
                                {avatars.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`avatar ${i + 1}`}
                                        onClick={() => {
                                            setAvatar(src);
                                        }}
                                        className={`w-full aspect-square rounded-full object-cover cursor-pointer transition-all hover:scale-105 ${avatar === src ? 'ring-2 ring-purple-500' : 'opacity-70 hover:opacity-100'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* display name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-white/40 text-xs uppercase tracking-wide">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                            placeholder="Your display name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    {/* bio */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-white/40 text-xs uppercase tracking-wide">Bio</label>
                        <textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            placeholder="Tell people about yourself..."
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors resize-none"
                        />
                    </div>

                    {/* banner url */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-white/40 text-xs uppercase tracking-wide">Banner URL</label>
                        <input
                            type="text"
                            value={bannerUrl}
                            onChange={e => setBannerUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                        />
                        {bannerUrl && (
                            <img
                                src={bannerUrl}
                                alt="banner preview"
                                className="w-full h-20 object-cover rounded-xl mt-1 opacity-70"
                                onError={e => (e.currentTarget.style.display = 'none')}
                            />
                        )}
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs">{error}</p>
                    )}

                    {/* actions */}
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}