"use client"
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
const cities = ["Paris", "New York", "London", "Tokyo"];

const categories = [
  "Photography",
  "Podcasting",
  "Music Production",
  "Film & Cinema",
  "Art & Design",
  "Content Creation",
];

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
    title: "For Hosts",
    links: [
      { label: "List Your Studio", href: "/add-studio" },
      { label: "Host Guidelines", href: "/host-guidelines" },
      { label: "Studio Insurance", href: "/studio-insurance" },
      { label: "Pricing Calculator", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About StudioSpace", href: "/#aboutUs" },
      { label: "Press & Editorial", href: "/press" },
      { label: "Support Concierge", href: "/support" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Trust & Safety", href: "/trust-safety" },
];

const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[#faf9f6] px-6 pt-16 pb-8 text-[#1c1c1c] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* MAIN FOOTER */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND SECTION */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight">
                Studio<span className="text-neutral-500">Space.</span>
              </h2>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-neutral-600">
              Discover extraordinary creative spaces designed to inspire.
              From daylight studios to cinematic production stages, find
              the perfect space to bring your vision to life.
            </p>

            {/* CITIES */}
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Available Worldwide
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* POPULAR CATEGORIES */}
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Popular Categories
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href="/exploreStudios"
                    className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-600 transition hover:border-black/30 hover:text-black"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* NAVIGATION COLUMNS */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-6 text-sm font-bold">
                {column.title}
              </h4>

              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="mt-16 border-y border-black/10 py-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Stay Inspired
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Creative spaces. Fresh inspiration.
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                Get studio discoveries and creative inspiration in your inbox.
              </p>
            </div>

            {/* NEWSLETTER INPUT */}
            <form
              className="flex w-full max-w-md items-center gap-2 rounded-full border border-black/15 bg-white p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <Mail size={18} className="ml-3 shrink-0 text-neutral-400" />

              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-neutral-400"
              />

              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white transition hover:bg-neutral-700"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col justify-between gap-7 pt-8 md:flex-row md:items-center">

          {/* COPYRIGHT */}
          <div>
            <p className="text-xs font-medium text-neutral-600">
              © 2026 StudioSpace Inc.
            </p>

            <p className="mt-1 text-[11px] text-neutral-400">
              Editorial spaces for extraordinary productions.
            </p>
          </div>

          {/* LEGAL LINKS */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-neutral-500 transition hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4">

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-neutral-500 transition hover:text-black"
            >
              <FaXTwitter size={17} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-500 transition hover:text-black"
            >
              <FaInstagram size={17} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-neutral-500 transition hover:text-black"
            >
              <FaFacebook size={17} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-neutral-500 transition hover:text-black"
            >
              <FaLinkedin size={17} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;