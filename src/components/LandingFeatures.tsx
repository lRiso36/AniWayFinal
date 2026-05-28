const landingFeatures = [
  {
    title: "Track Your Anime",
    description:
      "Keep track of every anime you've watched, are watching, or plan to watch.",
  },
  {
    title: "Create Custom Lists",
    description:
      "Build lists like favorites, comfort anime, best villains, or shows to recommend.",
  },
  {
    title: "Rate & Review",
    description:
      "Leave ratings and reviews so other fans can see what you thought.",
  },
  {
    title: "Follow Other Fans",
    description:
      "Follow users, see their activity, and discover anime through their lists and reviews.",
  },
  {
    title: "Personal Release Calendar",
    description:
      "See upcoming episodes for anime you watch or want to watch.",
  },
  {
    title: "Explore Anime Info",
    description:
      "View anime details, descriptions, cast, characters, reviews, and related shows.",
  },
];



export const LandingFeatures = () => {
    return (
        <section className="space-y-10">
            <div>
                <h2 className="
                text-4xl
                lg:text-4xl
                font-bold
                tracking-tight
                ">Aniway lets you...</h2>
            </div>
            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            ">
                {landingFeatures.map((feature) => (
                    <div key={feature.title} className="
                    p-5
                    border
                    border-purple-600/50
                    bg-purple-500/80
                    bg-white/10
                    hover:bg-purple-600/50
                    rounded-2xl
                    border
                    bg-white/5
                    backdrop-blur
                    transition
                    ">
                        <h3 className="
                          text-xl
                          font-semibold
                          mb-3
                        
                        ">{feature.title}</h3>
                        <p className="
                        text-zinc-300
                        leading-relaxed
                        ">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};