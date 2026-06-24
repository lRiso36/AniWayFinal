import { useState } from "react";
import { SignUpNav } from "../components/SignUpComponents/SignUpNav";
import { useNavigate } from "react-router-dom";
import { logIn } from "../services/authServices";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Loading } from "../components/Loading";

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { user, loading } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit() {
        try {
            await logIn(formData.email, formData.password);
            navigate("/home");
        } catch (error: any) {
            setError(error.message || "Unable to log in. Try again.");
        }
    }

    // if already logged in, redirect to home
    if (loading) return (
        <Loading loading={loading} />
    );

    if (user) return <Navigate to="/home" replace />;

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
                    preButton="Don't have an account?"
                    button="Sign Up"
                    to="/Signup"
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
                <h2 className="
                    text-2xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                ">Welcome Back</h2>
                <p className="
                    text-sm
                    sm:text-base
                    text-zinc-300
                    mt-1
                    max-w-md
                ">Continue your anime journey</p>

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
                        {/* Email */}
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
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className="relative">
                                <label className="text-sm text-zinc-400">
                                    Password <span className="text-purple-500">*</span>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Your password"
                                    className="
                                w-full
                                bg-zinc-900
                                border
                                border-white/10
                                rounded-xl
                                px-4
                                py-3
                                pr-10
                                sm:pr-15
                                mt-1
                                text-white
                                text-sm
                                sm:text-base
                                placeholder-zinc-600
                                focus:outline-none
                                focus:border-purple-500/60
                                transition
                                "
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="
                                    absolute right-3 sm:right-5 
                                    top-13 sm:top-13.5 -translate-y-1/2 
                                    text-white/30 hover:text-white/60 
                                    transition-colors"
                                >
                                    {showPassword ? (
                                        <svg width="16" height="16"
                                            viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2"
                                            className="sm:w-5 sm:h-5">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16"
                                            viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2"
                                            className="sm:w-5 sm:h-5">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="flex justify-between">
                                {error ? <p className="ml-2 mt-1 text-red-400 text-xs ">{error}</p> : <span />}
                                <p
                                    className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer mt-1 text-right"
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    Forgot password?
                                </p>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            className="
                            w-full
                            py-3
                            sm:py-4
                            rounded-xl
                            font-semibold
                            text-white
                            text-sm
                            sm:text-base
                            mt-4
                            transition
                            "
                            style={{
                                background: formData.email && formData.password
                                    ? "#9333ea"
                                    : "rgba(147,51,234,0.3)"
                            }}
                            disabled={!formData.email || !formData.password}
                            onClick={handleSubmit}
                        >
                            Login
                        </button>

                        <p className="text-center text-zinc-500 text-sm mt-2">
                            Don't have an account?{" "}
                            <span
                                className="text-purple-400 hover:text-purple-300 cursor-pointer"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}