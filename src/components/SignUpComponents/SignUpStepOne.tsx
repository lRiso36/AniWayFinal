// STILL NEED DATABASE STUFF
import { checkUsernameAvailable, checkEmailAvailable } from "../../services/authServices";
import type { AnimeType } from "../../types/AnimeType";
import { useState, useEffect } from "react";

type SignUpSTepOneType = {
    formData: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        avatar: string;
        displayName: string;
        bio: string;
        genre: string[];
        favorites: AnimeType[]
    }
    setFormData: React.Dispatch<React.SetStateAction<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        avatar: string;
        displayName: string;
        bio: string;
        genre: string[];
       favorites: AnimeType[]
    }>>;
    agreed: boolean;
    setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
    nextStep: () => void;
}

export const SignUpStepOne = ({formData, setFormData, agreed, setAgreed, nextStep}: SignUpSTepOneType) => {
    // checks and balances fr
    const passwordsMatch = 
        formData.password === formData.confirmPassword;
    const passwordsFilled = 
        formData.password.length > 0 &&
        formData.confirmPassword.length > 0;
    const passwordLengthValid = formData.password.length >= 8 ;
    const passwordHasNumber = /\d/.test(formData.password);
    const passwordHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const validPassword = passwordLengthValid && passwordHasSpecialChar && passwordHasNumber;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const approved = 
            passwordsMatch
            && validPassword
            && emailValid 
            && agreed
            && !usernameError
            && !emailError;

    useEffect(() => {
        if (!formData.username) return;
        const username = formData.username;

        const timer = setTimeout(async () => {
            const availableUsername = await checkUsernameAvailable(username);
            if (!availableUsername) {
                setUsernameError(`Username is already taken`);
            } else {
                setUsernameError('');
            } //end of if else
        }, 300);

        return () => clearTimeout(timer);
    }, [formData.username]);

    useEffect(() => {
        if (!formData.email) return;
        const email = formData.email;

        const timer = setTimeout(async () => {
            const availableEmail = await checkEmailAvailable(email);
            console.log('available', availableEmail)
            if (!availableEmail) {
                setEmailError('Email already used for an account');
            } else {
                setEmailError('')
            }
        }, 300)

        return () => clearTimeout(timer);
    }, [formData.email]);

    // function
    async function handleSubmit() {
        if (
            approved
        ) {
            nextStep();
        }
    }
    return (
        <div className="space-y-5">
            <div className="space-y-1">
                {/* username */}
                <label className="text-sm text-zinc-400">Username <span className="text-purple-500">*</span></label>
                {usernameError && (
                            <p className="text-red-400 text-sm mt-1">
                                {usernameError}
                            </p>
                )}
                <input
                    type="text"
                    placeholder="Choose a unique name"
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
                    value={formData.username}
                    onChange={(e) => 
                    setFormData(prev => ({
                        ...prev, username: e.target.value
                    }))}
                />
                </div>
                {/* email */}
                <div className="space-y-1">
                    {formData.email.length > 0 && !emailValid && (
                        <p className="text-red-400 text-xs mt-2">
                            Please enter a valid email address
                        </p>
                    )}
                    {emailError && (
                            <p className="text-red-400 text-sm mt-1">
                                {emailError}
                            </p>
                    )}
                    <label className="text-sm text-zinc-400">Email <span className="text-purple-500">*</span></label>
                    <input
                        type="email"
                        placeholder="explorere@domain.com"
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
                        onChange={(e) => 
                            setFormData(prev => ({
                                ...prev, email: e.target.value
                            }))
                        }
                    />
                </div>
                {/* password */}
                <div className="space-y-1">
                    <label className="text-sm text-zinc-400">Password <span className="text-purple-500">*</span></label>
                    <input
                        type="password"
                        placeholder="Password"
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
                        value={formData.password}
                        onChange={(e) => 
                            setFormData(prev => ({
                            ...prev, password: e.target.value
                            }))
                        }
                    />
                    <div className="
                    mt-2
                    space-y-1
                    text-xs
                    ">
                        <p className={passwordLengthValid ? "text-green-400" : "text-zinc-500"}>
                             • At least 8 characters 
                        </p>
                        <p className={passwordHasNumber ? "text-green-400" : "text-zinc-500"}>
                            • Contains a number
                        </p>
                        <p className={passwordHasSpecialChar ? "text-green-400" : "text-zinc-500"}>
                            • Contains a special character
                        </p>
                        </div>
                   </div>
                    {/* confirm password */}
                    <div className="space-y-1">
                        {passwordsFilled && !passwordsMatch && (
                            <p className="text-red-400 text-sm mt-1">
                                Passwords do not match
                            </p>
                        )}
                        <label className="text-sm text-zinc-400">Confirm Password <span className="text-purple-500">*</span></label>
                        <input
                            type="password"
                            placeholder="Repeat your password"
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
                            value={formData.confirmPassword}
                            onChange={(e) => 
                                setFormData(prev => ({
                                    ...prev, confirmPassword: e.target.value
                                }))
                            }
                        />
                    </div>

                    {/* checkbox */}
                    <div className="flex items-center gap-2 mt-5">
                        <input
                            type="checkbox"
                            id="agree"
                            className="accent-purple-500 shrink-0"
                            onChange={(e) => 
                                setAgreed(e.target.checked)
                            }
                            />
                        <label 
                            htmlFor="agree" 
                            className="text-xs sm:text-base text-zinc-500 leading-relaxed">
                            I agree to the
                            <span className="text-purple-400 cursor-pointer hover:underline"> 
                            Terms of Service</span>
                        </label>
                    </div>

                    {/* ADD FORGOT PASSWORD STUFF */}
                    {/* button */}
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
                        transition"
                       style={{
                        background: approved 
                        ? "#9333ea" 
                        : "rgba(147,51,234,0.3)"
                        }}
                        onClick={handleSubmit}
                        disabled={!(
                        approved
                        )}
                        >
                        Create Account
                    </button>
                    </div>
    )
}