import type { ReactNode } from "react";
import { SignUpNav } from "./SignUpNav";
import { ProgressBar } from "./SignUpProgressBar";

type SignUpContainerType = {
    title: string,
    subtitle?: string;
    step: number;
    children: ReactNode;
}
export const SignUpContainer = ({title, subtitle, step, children}: SignUpContainerType) => {
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
            <div>
                <nav>
                    <SignUpNav 
                    preButton="Already have an account?"
                    button="Log In"
                    to="/Login"
                    />
                </nav>
            </div>
            {/* main card */}
            <div className="
            flex 
            flex-col 
            items-center 
            text-center
            pt-28
            sm:pt-28
            md:pt-28
            pb-10
            ">
                <h2 className="
                text-2xl
                sm:text-4xl
                mm:text-5xl
                font-bold
                tracking-tight
                ">
                    {title}</h2>
                <p className="
                text-sm
                sm:text-base 
                text-zinc-300 
                mt-1
                max-w-md
                ">{subtitle}</p>

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
                "
                >
                <ProgressBar step={step} />
                {children}
                </div>
            </div>
    </main>     
    )       
}
