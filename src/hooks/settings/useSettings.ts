// src/hooks/settings/useSettings.ts
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { checkEmailAvailable, updateEmail } from "../../services/authServices";
import { toastError } from "../../lib/toast";

export const useSettings = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch {
            toastError("Failed to log out, please try again");
        }
    };

    const handleEmailChange = async (email: string) => {
        const isAvailable = await checkEmailAvailable(email);
        if (!isAvailable) throw new Error('That email is already in use');
        await updateEmail(user!.id, email);
    };

    return { user, handleLogout, handleEmailChange };
};