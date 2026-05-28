import { LandingHero } from "../components/LandingHero";
import { TopNavbar } from "../components/TopNavbar";
import { TrendingSection } from "../components/TrendingSection";
import { LandingFeatures } from "../components/LandingFeatures";
import { LandingSocialPreview } from "../components/LandingScoialPreview";
import { JoinLanding } from "../components/JoinLanding";

export const Landing = () => {
    return (

        <main className="
            min-h-screen
            bg-gradient-to-b
            from-[#020204]
            via-[#04050A]
            to-[#08090F]
            text-white
            ">
            <TopNavbar />

            <section className="">
                <LandingHero />
            </section>

             <section className="py-24">
                <div className="max-w-7xl mx-auto px-8">
                    <LandingSocialPreview />
                </div>
            </section>


            <section className="pb-8">
                <div className="max-w-7xl mx-auto px-8">
                    <TrendingSection />
                </div>
            </section>

            <section className="">
                <div className="max-w-7xl mx-auto px-8">
                    <LandingFeatures />
                </div>
            </section>

            <section className="">
                <div className="max-w-7xl mx-auto px-8">
                    <JoinLanding />
                </div>
            </section>
        </main>
    )
}