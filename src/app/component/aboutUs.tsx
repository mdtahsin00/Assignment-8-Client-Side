import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Discover Creative Spaces",
    description:
      "Explore unique photography studios, podcast rooms, music suites, and professional production spaces.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Book With Confidence",
    description:
      "Check real-time availability, compare transparent pricing, and reserve your ideal studio effortlessly.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Connect & Collaborate",
    description:
      "Bring studio owners and creative professionals together to build opportunities and inspire creativity.",
    icon: "⌘",
  },
  {
    number: "04",
    title: "Turn Ideas Into Reality",
    description:
      "Find the perfect environment and focus on creating something extraordinary.",
    icon: "✧",
  },
];

const categories = [
  "Photography",
  "Podcasting",
  "Music Production",
  "Film & Cinema",
  "Art & Design",
  "Content Creation",
];

export default function AboutSection() {
  return (
    <section
      
      className="pt-10 relative overflow-hidden bg-[#09090f] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      {/* Background Glow */}
      <div  className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

        {/* WHAT WE DO */}
      <div id="howItWork" className="relative mx-auto max-w-7xl">
        <div   className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            What We Do
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="text-violet-400">Create.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            We make finding, booking, and sharing creative spaces easier than
            ever. Less time searching, more time creating.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl text-violet-400">{feature.icon}</span>
                <span className="text-sm text-gray-600">{feature.number}</span>
              </div>

              <h3 className="mt-8 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                {feature.description}
              </p>

              <div className="mt-7 h-px w-full bg-white/10 transition group-hover:bg-violet-400/50" />
            </div>
          ))}
        </div>

        {/* OUR MISSION */}
        <div
          id="our-mission"
          className="mt-24 grid overflow-hidden rounded-3xl border border-white/10 bg-[#14121e] lg:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Our Mission
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Empowering Creators.
              <br />
              <span className="text-violet-400">Connecting Spaces.</span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              We believe every great idea deserves the right environment. Our
              mission is to make professional creative spaces accessible to
              everyone while helping studio owners unlock the full potential of
              their spaces.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              Through transparent pricing, flexible reservations, and seamless
              booking management, we are building a community where creativity
              has no boundaries.
            </p>
          </div>

          <div
            className="min-h-[350px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200')",
            }}
          />
        </div>

        {/* FINAL CTA */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950 via-[#171329] to-[#101b2b] px-6 py-16 text-center sm:px-12">
          <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">
              Your Creative Journey Starts Here
            </span>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
              Your Vision. Your Space.
              <br />
              Your Next Big Creation.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
              Discover inspiring studios, connect with creative professionals,
              and turn your next big idea into reality.
            </p>

            <a
              href="/studios"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-violet-200"
            >
              Explore Studios
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-24 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* HERO SECTION */}
        <div id="aboutUs" className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              About StudioSpace
            </span>

            <h2 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Where Creativity
              <br />
              Finds Its{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Space.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-400">
              StudioSpace is a creative marketplace connecting passionate
              creators with inspiring spaces. Whether you are a filmmaker,
              photographer, podcaster, or musician, we help you find the perfect
              environment to bring your vision to life.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
                >
                  {category}
                </span>
              ))}
            </div>

            <a
              href="#our-mission"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-1 hover:bg-violet-500"
            >
              Discover Our Story
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* IMAGE AREA */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 blur-2xl" />

            <div className="relative grid grid-cols-2 gap-4">
              <div
                className="h-64 rounded-2xl border border-white/10 bg-cover bg-center sm:h-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900')",
                }}
              />

              <div
                className="mt-12 h-64 rounded-2xl border border-white/10 bg-cover bg-center sm:h-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900')",
                }}
              />

              <div className="col-span-2 rounded-2xl border border-white/10 bg-[#15141e] p-5 sm:p-6">
                <p className="text-sm text-gray-400">
                  Built for every creative mind
                </p>
                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                  One Platform. Endless Possibilities.
                </h3>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
