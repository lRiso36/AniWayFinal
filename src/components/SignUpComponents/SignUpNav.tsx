import { useNavigate } from "react-router-dom";

type SignUpNavType = {
    preButton: string
    button: string
    to: string
}
export const SignUpNav =  ({preButton, button, to}: SignUpNavType) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(to)
    }
    return (
    <nav className="
        absolute
        top-0
        left-0
        w-full
        z-50
        bg-white/5
    "
    >
        <div className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-4
            sm:py-5
            flex
            items-center
            justify-between
            gap-4
        ">
            <h1
            className="
                text-xl
                sm:text-2xl
                font-bold
                tracking-wide
                shrink-0
            ">
                AniWay</h1>

            <div className="flex items-center gap-2 sm:gap-4">
                <p className="
                hidden
                sm:block
                text-sm 
                md:text-base
                text-zinc-300
                whitespace-nowrap
                ">
                    {preButton} </p>

                <button className="
                    bg-purple-700
                    hover:bg-purple-600
                    px-4
                    sm:px-5
                    py-2
                    rounded-xl
                    font-medium
                    text-sm
                    sm:text-base
                    transition
                    shrink-0
                "
                    onClick={handleClick}
                    >
                    {button}</button>
            </div>
        </div>
    </nav>
    )
}
