import { useState} from "react";
import type { AnimeType } from "../types/AnimeType";
import {useNavigate} from "react-router-dom"
import { SignUpStepOne } from "../components/SignUpComponents/SignUpStepOne";
import { SignUpContainer } from "../components/SignUpComponents/SignUpContainer";
import { SignUpStepThree } from "../components/SignUpComponents/SignUpStepThree";
import { SignUpStepTwo } from "../components/SignUpComponents/SignUpStepTwo";
import { signUp } from "../services/authServices";

export const SignUp = () => {
    const navigate = useNavigate()
    // use states
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
        displayName: "",
        bio: "",
        genre: [] as string[],
        favorites: [] as AnimeType[],
    });
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    

    // variable functions
    const nextStep = async () => {
        if (loading) return;

        if (step === 3) {
            try {
                console.log("FINAL FAVORITES", formData.favorites);
                await signUp(
                    formData.username,
                    formData.email,
                    formData.password,
                    formData.avatar,
                    formData.displayName || formData.username,
                    formData.bio,
                    formData.genre,
                    formData.favorites
                );
                setStep(4)

                setTimeout(() => {
                navigate("/login")
             }, 2000)

            }catch (error:any) {
                console.error(error.message);
                alert(error.message || "Failed to create account");
            } finally {
                setLoading(false)
            }
        } else {
            setStep(prev => prev + 1);
        }
    }
    const prevStep = () => setStep(prev => prev - 1);
    
    const stepContent: Record<number, { title: string; subtitle: string }> = {
        1: { title: "Begin Your Adventure", subtitle: "Join the community of anime explorers today" },
        2: { title: "Build Your Profile", subtitle: "Tell the community about yourself" },
        3: { title: "What Shows Do You Love??", subtitle: "Add anime to kick off your list" },
        4: { title: "", subtitle: "" },
    }

    return (
            <SignUpContainer 
            title={stepContent[step].title} 
            subtitle={stepContent[step].subtitle} 
            step={step}>
            {step === 1 && (
                <SignUpStepOne
                formData={formData}
                setFormData={setFormData}
                agreed={agreed}
                setAgreed={setAgreed}
                nextStep={nextStep}
            />
            )}
            {step === 2 && (
                <SignUpStepTwo
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                />
            )}
            {step === 3 && (
                <SignUpStepThree
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                />
            )}
            {step === 4 && (
                <div className="flex flex-col items-center justify-center space-y-3 py-10">
                    <p className="text-4xl">🎉</p>
                    <h2 className="text-white text-xl font-semibold">Welcome to AniWay!</h2>
                    <p className="text-zinc-400 text-sm">Taking you to login...</p>
                </div>
            )}
            </SignUpContainer>
        )
}