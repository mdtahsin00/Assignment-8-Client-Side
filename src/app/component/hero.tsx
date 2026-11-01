import Link from "next/link";

const Hero = () => {
  return (
    <section>
      {/* ===== Top: light gradient area ===== */}
      <div className="bg-gradient-to-br from-white via-white to-orange-100/70 px-5 pt-8 pb-12">
        <div className="container mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral shadow-sm ring-1 ring-black/5">
            <span className="size-2 rounded-full bg-orange-500" />
            The Creative Production Marketplace
          </div>

          {/* Headline + right column */}
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight text-neutral">
              Find Your Space.
              <span className="block text-orange-500">
                Create Something
                <br />
                Extraordinary.
              </span>
            </h1>

            <div className="w-full max-w-sm">
              <p className="text-sm leading-relaxed text-neutral/70">
                Instant access to vetted daylight lofts, cyclorama soundstages,
                podcast lounges, and mastering suites across major global
                capitals.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/exploreStudios"
                  className="btn rounded-full border-none bg-orange-500 px-6 text-white hover:bg-orange-600"
                >
                  Explore Studios
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                  </svg>
                </Link>

                <Link
                  href="/signUp"
                  className="btn rounded-full border-base-300 bg-base-100 px-6 text-neutral hover:border-orange-400 hover:bg-orange-50"
                >
                  Host Your
                  <br />
                  Space
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H8m9 0v9" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom: dark area with featured image + search ===== */}
      <div className="relative bg-[#0d0d0d] px-5 pt-5 pb-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
          {/* Studio scene (stylized placeholder — swap with a real photo via <img> / next/image) */}
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <rect width="1200" height="520" fill="#e9e6e2" />
            <rect y="390" width="1200" height="130" fill="#d8d4cf" />
            {/* Windows */}
            <g>
              <rect x="20" y="30" width="230" height="310" fill="#f7f6f4" stroke="#4a4641" strokeWidth="7" />
              <line x1="135" y1="30" x2="135" y2="340" stroke="#4a4641" strokeWidth="5" />
              <line x1="20" y1="130" x2="250" y2="130" stroke="#4a4641" strokeWidth="5" />
              <line x1="20" y1="235" x2="250" y2="235" stroke="#4a4641" strokeWidth="5" />
            </g>
            {/* Table */}
            <g fill="#8a7f72">
              <rect x="255" y="320" width="120" height="10" rx="3" />
              <rect x="265" y="330" width="8" height="60" />
              <rect x="357" y="330" width="8" height="60" />
            </g>
            {/* Cyclorama backdrop */}
            <path d="M430 70 h520 q40 0 40 40 v280 h-560 z" fill="#f7f5f2" />
            <ellipse cx="700" cy="392" rx="290" ry="34" fill="#e4e0db" />
            {/* Softbox 1 (large) */}
            <g>
              <ellipse cx="640" cy="180" rx="62" ry="50" fill="#1b1917" transform="rotate(-18 640 180)" />
              <line x1="640" y1="230" x2="640" y2="392" stroke="#1b1917" strokeWidth="7" />
              <line x1="640" y1="392" x2="608" y2="430" stroke="#1b1917" strokeWidth="6" />
              <line x1="640" y1="392" x2="672" y2="430" stroke="#1b1917" strokeWidth="6" />
            </g>
            {/* Softbox 2 (smaller) */}
            <g>
              <ellipse cx="820" cy="150" rx="44" ry="36" fill="#24211e" transform="rotate(12 820 150)" />
              <line x1="820" y1="188" x2="820" y2="392" stroke="#24211e" strokeWidth="6" />
              <line x1="820" y1="392" x2="794" y2="426" stroke="#24211e" strokeWidth="5" />
              <line x1="820" y1="392" x2="846" y2="426" stroke="#24211e" strokeWidth="5" />
            </g>
            {/* Tripod + camera */}
            <g>
              <line x1="1020" y1="250" x2="1020" y2="360" stroke="#141210" strokeWidth="7" />
              <line x1="1020" y1="360" x2="985" y2="430" stroke="#141210" strokeWidth="6" />
              <line x1="1020" y1="360" x2="1055" y2="430" stroke="#141210" strokeWidth="6" />
              <rect x="995" y="222" width="56" height="34" rx="6" fill="#141210" />
              <circle cx="1051" cy="239" r="11" fill="#141210" />
            </g>
            {/* Person with camera (right) */}
            <g fill="#141210">
              <circle cx="1105" cy="230" r="15" />
              <rect x="1088" y="248" width="34" height="70" rx="14" />
              <rect x="1082" y="318" width="13" height="80" rx="6" />
              <rect x="1108" y="318" width="13" height="80" rx="6" />
            </g>
            {/* Person filming (left of tripod) */}
            <g fill="#1f1c19">
              <circle cx="930" cy="238" r="14" />
              <rect x="914" y="255" width="32" height="66" rx="13" />
              <rect x="908" y="321" width="12" height="76" rx="6" />
              <rect x="933" y="321" width="12" height="76" rx="6" />
            </g>
          </svg>

          {/* Legibility gradient + featured info */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
              Featured Stage
            </p>
            <p className="mt-1 text-xl font-bold">
              The Daylight Sanctuary • Loft 48
            </p>
            <p className="text-xs text-white/70">Greenpoint, Brooklyn</p>
          </div>

          {/* Price */}
          <div className="absolute bottom-24 right-8 text-right text-white">
            <p className="text-2xl font-extrabold">
              $<span className="text-orange-500">850</span>{" "}
              <span className="text-sm font-semibold text-white/80">/ day</span>
            </p>
          </div>

          {/* Pagination */}
          <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-2 text-white/90">
            <button aria-label="Previous" className="grid size-7 place-items-center rounded-full bg-white/15 hover:bg-white/30">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs font-semibold">4/6</span>
            <button aria-label="Next" className="grid size-7 place-items-center rounded-full bg-white/15 hover:bg-white/30">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating search bar */}
        <div className="absolute inset-x-5 bottom-8 mx-auto max-w-3xl">
          <div className="flex flex-col items-stretch gap-2 rounded-[2rem] bg-white p-3 shadow-2xl ring-1 ring-black/5 md:flex-row md:items-center">
            {/* Where */}
            <div className="flex-1 px-4 py-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                Where
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-neutral">
                <svg className="size-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Brooklyn, NY / Arts District.
              </p>
            </div>

            {/* Studio type */}
            <div className="hidden border-l border-base-200 md:block" />
            <div className="flex-1 px-4 py-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                Studio Type
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-neutral">
                <svg className="size-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                Photo-Daylight Studio
              </p>
            </div>

            {/* When */}
            <div className="hidden border-l border-base-200 md:block" />
            <div className="flex-1 px-4 py-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                When
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-neutral">
                <svg className="size-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Pick Date • Half/Full Day
              </p>
            </div>

            {/* Search button */}
            <button className="btn rounded-full border-none bg-orange-500 px-6 text-white hover:bg-orange-600">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Search Studios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
