import { useState, useEffect } from "react";
import { checkUsernameAvailable, checkEmailAvailable } from "../services/authServices";

export const useSignUpValidation = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    agreed: boolean,
) => {
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const passwordsMatch = password === confirmPassword;
    const passwordsFilled = password.length > 0 && confirmPassword.length > 0;
    const passwordLengthValid = password.length >= 8;
    const passwordHasNumber = /\d/.test(password);
    const passwordHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const validPassword = passwordLengthValid && passwordHasSpecialChar && passwordHasNumber;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const usernameValid = username.length >= 3 &&
        username.length <= 20 &&
        /^[a-zA-Z0-9_]+$/.test(username);

    const approved =
        passwordsMatch
        && validPassword
        && emailValid
        && agreed
        && !usernameError
        && !emailError
        && usernameValid;

    useEffect(() => {
        if (!username) {
            setUsernameError('');
            return;
        }
        if (username.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            return;
        }
        if (username.length > 20) {
            setUsernameError('Username must be under 20 characters');
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setUsernameError('Username can only contain letters, numbers and underscores');
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const available = await checkUsernameAvailable(username);
                if (!available) setUsernameError('Username is already taken');
                else setUsernameError('');
            } catch {
                setUsernameError('');
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [username]);

    useEffect(() => {
        if (!email) {
            setEmailError('');
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const availableEmail = await checkEmailAvailable(email);
                if (!availableEmail) setEmailError('Email already used for an account');
                else setEmailError('');
            } catch {
                setEmailError('');
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [email]);

    return {
        usernameError,
        emailError,
        passwordsMatch,
        passwordsFilled,
        passwordLengthValid,
        passwordHasNumber,
        passwordHasSpecialChar,
        emailValid,
        approved,
    };
}