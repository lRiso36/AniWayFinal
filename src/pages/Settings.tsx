import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { checkEmailAvailable, updatePassword, updateEmail } from "../services/authServices";
import toast from "react-hot-toast";

export const Settings = () => {
    const { logout, username, user } = useAuth();
    const navigate = useNavigate();

    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [emailMessage, setEmailMessage] = useState<string | null>(null);
    const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            toast.error("Failed to log out, please try again")
        }
    }

    const handleEmailChange = async () => {
        if (!newEmail.trim()) return;
        setEmailLoading(true);
        setEmailError(null);
        setEmailMessage(null);

        try {
            const isAvailable = await checkEmailAvailable(newEmail.trim());
            if (!isAvailable) {
                setEmailError('That email is already in use');
                return;
            }
            await updateEmail(user!.id, newEmail.trim());
            setEmailMessage('Check both your old and new email for a confirmation link.');
            setNewEmail('');
            setShowEmailForm(false);
        } catch (error: any) {
            setEmailError(error.message || "Something went wrong, please try again");
        } finally {
            setEmailLoading(false);
        }
    }

    const handlePasswordChange = async () => {
        if (!newPassword.trim()) return;

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }
        if (!/[0-9]/.test(newPassword)) {
            setPasswordError('Password must contain at least one number');
            return;
        }
        if (!/[^a-zA-Z0-9]/.test(newPassword)) {
            setPasswordError('Password must contain at least one special character');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordLoading(true);
        setPasswordError(null);
        setPasswordMessage(null);

        try {
            await updatePassword(newPassword);
            setPasswordMessage('Password updated successfully.');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordForm(false);
        } catch (error: any) {
            setPasswordError(error.message || "Something went wrong, please try again");
        } finally {
            setPasswordLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a14]">
            <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 w-full">
                <h1 className="text-white font-bold text-2xl">Settings</h1>

                {/* account section */}
                <div className="flex flex-col gap-1">
                    <p className="text-white/40 text-xs uppercase tracking-wide px-1 mb-2">Account</p>
                    <div className="bg-[#12121f] border border-white/8 rounded-2xl overflow-hidden">

                        {/* username */}
                        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
                            <div>
                                <p className="text-white/40 text-xs mb-0.5">Username</p>
                                <p className="text-white text-sm">@{username}</p>
                            </div>
                        </div>

                        {/* email */}
                        <div className="flex flex-col border-b border-white/8">
                            <div className="flex items-center justify-between px-4 py-3.5">
                                <div>
                                    <p className="text-white/40 text-xs mb-0.5">Email</p>
                                    <p className="text-white text-sm">{user?.email}</p>
                                </div>
                            </div>
                            {showEmailForm && (
                                <div className="flex flex-col gap-2 px-4 pb-4">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={e => setNewEmail(e.target.value)}
                                        placeholder="New email address"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                                    />
                                    {emailError && <p className="text-red-400 text-xs">{emailError}</p>}
                                    <button
                                        onClick={handleEmailChange}
                                        disabled={emailLoading}
                                        className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium py-2 rounded-xl transition-colors disabled:opacity-50"
                                    >
                                        {emailLoading ? 'Sending...' : 'Send Confirmation'}
                                    </button>
                                </div>
                            )}
                            {emailMessage && <p className="text-purple-400 text-xs px-4 pb-3">{emailMessage}</p>}
                        </div>

                        {/* password */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between px-4 py-3.5">
                                <div>
                                    <p className="text-white/40 text-xs mb-0.5">Password</p>
                                    <p className="text-white text-sm">••••••••</p>
                                </div>
                                <button
                                    onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordError(null); setPasswordMessage(null); setConfirmPassword(''); setNewPassword('') }}
                                    className="text-purple-400 text-xs hover:text-purple-300 transition-colors"
                                >
                                    {showPasswordForm ? 'Cancel' : 'Change'}
                                </button>
                            </div>
                            {showPasswordForm && (
                                <div className="flex flex-col gap-2 px-4 pb-4">
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="New password"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                                    />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
                                    />
                                    {passwordError && <p className="text-red-400 text-xs">{passwordError}</p>}
                                    <button
                                        onClick={handlePasswordChange}
                                        disabled={passwordLoading}
                                        className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium py-2 rounded-xl transition-colors disabled:opacity-50"
                                    >
                                        {passwordLoading ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            )}
                            {passwordMessage && <p className="text-purple-400 text-xs px-4 pb-3">{passwordMessage}</p>}
                        </div>
                    </div>
                </div>

                {/* session */}
                <div className="flex flex-col gap-1">
                    <p className="text-white/40 text-xs uppercase tracking-wide px-1 mb-2">Session</p>
                    <div className="bg-[#12121f] border border-white/8 rounded-2xl overflow-hidden">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">🚪</span>
                                <p className="text-red-400 text-sm">Log Out</p>
                            </div>
                            <span className="text-red-400/50 text-sm">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}