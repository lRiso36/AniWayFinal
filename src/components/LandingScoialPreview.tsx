import PFP from "../assets/PFP.jpg"
import PFP2 from "../assets/PFP2.jpg"
import ergoProxy from "../assets/ergoProxy.jpg"
import psychoPass from "../assets/psychoPass.jpg"
import terrorIn from "../assets/terrorIn.jpg"

export const LandingSocialPreview = () => {
    const previewAnime = [ergoProxy, psychoPass, terrorIn];

  return (
    <section className="space-y-8">
        <div className="
            flex
            flex-col
            md:flex-row
            gap-6
            justify-between
            ">
            <div
            className="
                bg-white/5
                border
                border-white/10
                backdrop-blur
                rounded-2xl
                p-5
                w-full
                lg:w-100
                shadow-lg
                hover:bg-white/10
                transition
                flex
                gap-4
                items-start
            "
            >
                <div className="shrink-0">
                    <img 
                        src={PFP} 
                        alt="PFP" 
                        className="
                        w-16
                        h-16
                        rounded-full
                        object-cover
                        " />
                    </div>
                        <div className="
                        flex 
                        flex-col 
                        justify-between 
                        flex-1 
                        h-full
                        p-1
                        "> 
                            <h3 className="mt-1 text-sm text-zinc-400">
                            Sarah rated
                            </h3>

                            <p className="mt-2 text-2xl font-semibold">
                            Attack on Titan
                            </p>

                            <p className="mt-2 text-purple-400 font-bold text-2xl">
                            10/10
                            </p>

                            <p className="mt-3 text-zinc-400 italic">
                            "This was a  masterpiece from start to finish"
                            </p>
                    </div> 
                </div>


            <div
          className="
            bg-white/5
            border
            border-white/10
            backdrop-blur
            rounded-2xl
            p-5
            w-full
            lg:w-100
            shadow-lg
            hover:bg-white/10
            transition
          "
        >
          <h3 className="text-xl font-semibold">
            Top Psychological Anime
          </h3>

          <p className="mt-2 text-zinc-400">
            by @mike
          </p>

          <p className="mt-4 text-purple-400 font-medium">
            15 anime
          </p>

          <div className="flex items-center gap-2 mt-4">
  {previewAnime.map((anime, index) => (
    <img
      key={index}
      src={anime}
      alt="anime cover"
      className="
        w-14
        h-20
        object-cover
        rounded-lg
        flex-shrink-0
      "
    />
  ))}

  <div className="ml-3 font-bold text-zinc-400">
    + 12
  </div>
</div>
        </div>


                <div
                className="
                bg-white/5
                border
                border-white/10
                backdrop-blur
                rounded-2xl
                p-5
                w-full
                lg:w-100
                shadow-lg
                hover:bg-white/10
                transition
                flex 
                gap-4
                "
                >
                    <div className="shrink-0">
                        <img 
                        src={PFP2} 
                        alt="PFP2" 
                        className="
                        w-16
                        h-16
                        rounded-full
                        object-cover
                        " />
                    </div>
                    <div className="
                    flex 
                    flex-col 
                    justify-between 
                    flex-1 
                    h-full">
                    <h3 className="text-sm text-zinc-400 mt-2">
                    Emma started watching
                    </h3>

                    <p className="mt-2 text-2xl font-semibold">
                    Jujutsu Kaisen
                    </p>

                    <p className="mt-1 text-zinc-400">
                    Episode 1 of 24
                    </p>

          {/* fake progress bar */}
                    <div className="mt-5">
                        <div className="w-full h-2 bg-zinc-800 rounded-full mb-5">
                            <div className="w-[5%] h-2 bg-purple-500 rounded-full"></div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    </section>
  );
};