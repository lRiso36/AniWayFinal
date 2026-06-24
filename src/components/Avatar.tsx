import { useState } from "react";

type AvatarType = {
    avatar?: string | null;
    username?: string | null;
    size?: string;
    textSize?: string;
}

export const Avatar = ({ avatar, username, size = "w-10 h-10", textSize = "text-sm" }: AvatarType) => {
    const [imgFailed, setImgFailed] = useState(false);

    if (avatar && !imgFailed) {
        return (
            <img
                src={avatar}
                alt="avatar"
                className={`${size} rounded-full object-cover shrink-0`}
                onError={() => setImgFailed(true)}
            />
        )
    }

    return (
        <div className={`${size} rounded-full bg-purple-600 flex items-center justify-center shrink-0`}>
            <span className={`text-white font-semibold uppercase ${textSize} sm:pb-1`}>
                {username?.charAt(0) ?? '?'}
            </span>
        </div>
    )
}