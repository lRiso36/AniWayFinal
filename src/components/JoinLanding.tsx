import { useNavigate } from "react-router-dom";

export const JoinLanding = () => {
  const navigate = useNavigate();
  return (
    <section
      className="
        py-26
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
          px-8
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            shadow-2xl
            px-8
            md:px-16
            py-16
            text-center
          "
        >
          {/* glow blob */}
          {/* <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-96
              h-96
              bg-purple-600/20
              blur-3xl
            "
          ></div> */}

          {/* content */}
          <div className="relative z-10">
            <h2
              className="
                text-4xl
                md:text-6xl
                font-bold
                tracking-tight
              "
            >
              Join the AniWay community.
            </h2>

            <p
              className="
                mt-6
                text-zinc-300
                text-lg
                md:text-xl
                max-w-2xl
                mx-auto
                leading-relaxed
              "
            >
              Track what you watch, build custom lists, share reviews,
              and discover anime through fans just like you.
            </p>

            <div
              className="
                mt-10
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-4
              "
            >
              <button
                className="
                  bg-purple-600
                  hover:bg-purple-500
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  text-lg
                  transition
                  shadow-lg
                "
                onClick={()=>navigate("/signup")}
              >
                Get Started Free
              </button>

              <button
                className="
                  border
                  border-white/20
                  bg-white/5
                  hover:bg-white/10
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  text-lg
                  transition
                "
                onClick={()=>navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};