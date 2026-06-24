import { useState } from "react";
import { SignUpNav } from "../components/SignUpComponents/SignUpNav";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authServices";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email.trim()) return;

        setLoading(true);
        setError('');

        try {
            await forgotPassword(email.trim());
            setSent(true);
        } catch (err: any) {
            setError(err.message || "Unable to send email right now. Try again later.");
        } finally {
            setLoading(false);
        }
    }

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

            <div className="
                flex
                flex-col
                items-center
                text-center
                pt-28
                pb-10
            ">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                    Forgot Password
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 mt-1 max-w-md">
                    {sent ? "Check your email for a reset link" : "Enter your email and we'll send you a reset link"}
                </p>

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
                    {sent ? (
                        <div className="flex flex-col gap-4 items-center text-center py-4">
                            <p className="text-4xl">📬</p>
                            <p className="text-white font-semibold text-lg">Email sent!</p>
                            <p className="text-zinc-400 text-sm">Check your inbox for a password reset link. It may take a few minutes.</p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 rounded-xl font-semibold text-white text-sm sm:text-base mt-2 bg-purple-600 hover:bg-purple-500 transition"
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-sm text-zinc-400">
                                    Email <span className="text-purple-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="aniway@gmail.com"
                                    className="
                                    w-full
                                    bg-zinc-900
                                    border
                                    border-white/10
                                    rounded-xl
                                    px-4
                                    py-3
                                    mt-1
                                    text-white
                                    text-sm
                                    sm:text-base
                                    placeholder-zinc-600
                                    focus:outline-none
                                    focus:border-purple-500/60
                                    transition
                                    "
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                />
                                {error && <p className="ml-2 mt-1 text-red-400 text-xs">{error}</p>}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!email.trim() || loading}
                                className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white text-sm sm:text-base mt-4 transition"
                                style={{
                                    background: email.trim()
                                        ? "#9333ea"
                                        : "rgba(147,51,234,0.3)"
                                }}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <p className="text-center text-zinc-500 text-sm mt-2">
                                Remember your password?{" "}
                                <span
                                    className="text-purple-400 hover:text-purple-300 cursor-pointer"
                                    onClick={() => navigate('/login')}
                                >
                                    Log in
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}