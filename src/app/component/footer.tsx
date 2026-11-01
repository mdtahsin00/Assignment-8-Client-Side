import Link from "next/link";

const cities = ["Paris", "New York", "London", "Tokyo"];

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Daylight Lofts", href: "/exploreStudios" },
      { label: "Cyclorama Stages", href: "/exploreStudios" },
      { label: "Industrial Warehouses", href: "/exploreStudios" },
      { label: "Mid-Century Villas", href: "/exploreStudios" },
    ],
  },
  {
    title: "Hosts",
    links: [
      { label: "List Your Studio", href: "/#" },
      { label: "Host Guidelines", href: "/#" },
      { label: "Studio Insurance", href: "/#" },
      { label: "Pricing Calculator", href: "/#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About StudioSpace", href: "/#aboutUs" },
      { label: "Press & Editorial", href: "/#" },
      { label: "Support Concierge", href: "/#" },
      { label: "Terms & Privacy", href: "/#" },
    ],
  },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Trust & Safety"];

const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[#faf9f6] px-6 py-12 text-[#1c1c1c] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <h3 className="text-center text-xl font-semibold">StudioSpace</h3>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Curated architectural, production, and daylight studios tailored
              for visionary creators, photographers, and directors worldwide.
            </p>

            <div className="mt-6 flex flex-wrap gap-5 text-[11px] font-bold tracking-wider">
              {cities.map((city) => (
                <span key={city} className="uppercase">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-semibold">{column.title}</h4>

              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 text-xs text-neutral-700 sm:flex-row">
          <p>© 2025 StudioSpace Inc. Editorial spaces for extraordinary productions.</p>

          <div className="flex flex-wrap justify-center gap-8">
            {legalLinks.map((label) => (
              <Link
                key={label}
                href="/#"
                className="transition hover:text-black"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
