import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpNav } from "../components/SignUpComponents/SignUpNav";
import supabase from "../supabase";
import { updatePassword } from "../services/authServices";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [validSession, setValidSession] = useState(false);

    useEffect(() => {
        // supabase puts the token in the URL hash when redirecting
        // this listens for the PASSWORD_RECOVERY event which fires when the reset link is clicked
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setValidSession(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async () => {
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (!/[0-9]/.test(password)) {
            setError('Password must contain at least one number');
            return;
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            setError('Password must contain at least one special character');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await updatePassword(password);
            navigate('/login');
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    }

    if (!validSession) return (
        <main className="
            min-h-screen
            bg-gradient-to-b
            from-[#020204]
            via-[#04050A]
            to-[#08090F]
            text-white
            px-4
            sm:px-6
            lg:px-8
            flex items-center justify-center
        ">
            <p className="text-white/50 text-sm">Waiting for reset link...</p>
        </main>
    );

    return (
        <main className="
            min-h-screen
            bg-gradient-to-b
            from-[#020204]
            via-[#04050A]
            to-[#08090F]
            text-white
            px-4
            sm:px-6
            lg:px-8
        ">
            <nav>
                <SignUpNav
                    preButton="Remember your password?"
                    button="Log In"
                    to="/login"
                />
            </nav>

            <div className="flex flex-col items-center text-center pt-28 pb-10">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Reset Password</h2>
                <p className="text-sm sm:text-base text-zinc-300 mt-1 max-w-md">Enter your new password below</p>

                <div className="
                    mt-6
                    w-full
                    max-w-md
                    md:max-w-xl
                    lg:max-w-2xl
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    sm:p-8
                    md:p-10
                    text-left
                ">
                    <div className="space-y-5">
                        {/* new password */}
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">
                                New Password <span className="text-purple-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="New password"
                                    className="
                                    w-full bg-zinc-900 border border-white/10 rounded-xl
                                    px-4 py-3 pr-10 mt-1 text-white text-sm sm:text-base
                                    placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition
                                    "
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-4 translate-y-0 text-white/30 hover:text-white/60 transition-colors mt-0.5"
                                >
                                    {showPassword ? (
                                        <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className="space-y-1">
                            <label className="text-sm text-zinc-400">
                                Confirm Password <span className="text-purple-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="Confirm new password"
                                    className="
                                    w-full bg-zinc-900 border border-white/10 rounded-xl
                                    px-4 py-3 pr-10 mt-1 text-white text-sm sm:text-base
                                    placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition
                                    "
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-4 translate-y-0 text-white/30 hover:text-white/60 transition-colors mt-0.5"
                                >
                                    {showConfirm ? (
                                        <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-xs ml-1">{error}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={!password || !confirmPassword || loading}
                            className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base mt-4 transition"
                            style={{
                                background: password && confirmPassword
                                    ? "#9333ea"
                                    : "rgba(147,51,234,0.3)"
                            }}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}