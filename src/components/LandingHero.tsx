import {useNavigate } from "react-router-dom"
import heroImage from '../assets/AniWayHeroImage.png'

export const LandingHero = () => {
    const navigate = useNavigate();
    return (
        <section className="
        min-h-screen
        relative
        bg-cover
        bg-center
        flex
        items-center
        "
        style={{
            backgroundImage: `url(${heroImage})`,
        }}
        >
            <div className="
                absolute
                inset-0
                bg-black/50
            ">
                <div className="
                    relative
                    z-10
                    max-w-7xl
                    mx-auto
                    px-8
                    w-full
                    pt-40
                ">
                    <div className="max-w-2xl">
                        <div>
                            <h2 className="
                                text-6xl
                                md:text-7xl
                                font-bold
                                leading-tight
                            ">Track. Rate.</h2>
                            <h2 className="
                                text-6xl
                                md:text-7xl
                                font-bold
                                leading-tight
                            ">Share Anime.</h2>
                        </div>
                        <div className="mt-6">
                            <p className="
                                text-lg
                                md:text-xl
                                text-gray-200
                                leading-relaxed
                                max-w-xl
                            ">
                                Build your anime world. Track what you've watched,
                                create lists, follow other fans, and never
                                miss a release.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button className="
                                bg-purple-700
                                hover:bg-purple-600
                                px-6
                                py-3
                                rounded-xl
                                font-medium
                                transition
                            "
                            onClick={()=>navigate("/signup")}
                            >
                                Get Started Free</button>

                            <button className="
                            border
                            border-white/50
                            bg-white/10
                            backdrop-blur
                            px-6
                            py-3
                            rounded-xl
                            font-medium
                            hover:bg-white/20
                            transition
                            ">
                                About</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}