import { useNavigate } from "react-router-dom"

export const TopNavbar =  () => {
    const navigate = useNavigate();

    return (
    <nav className="
        absolute
        top-0
        left-0
        w-full
        z-50
        bg-black/50
    "
    >
        <div className="
            max-w-7xl
            mx-auto
            px-8
            py-6
            flex
            items-center
            justify-between
        ">
            <h1
            className="
                text-2xl
                font-bold
                tracking-wide
            ">
                AniWay</h1>

            <div className="flex items-center gap-4">
                <button className="
                font-medium
                hover:scale-110 transition-transform
                "
                onClick={()=>navigate("/login")}
                >
                    Login</button>

                <button className="
                    bg-purple-700
                    hover:bg-purple-600
                    px-5
                    py-1
                    rounded-xl
                    font-medium
                    transition
                "
                onClick={()=>navigate("/signup")}
                >
                    SignUp</button>
            </div>
        </div>
    </nav>
    )
}
