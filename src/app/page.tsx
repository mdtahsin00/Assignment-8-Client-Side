"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Camera, Clapperboard, Mic, Music, Palette, ShieldCheck, BadgeCheck, Wrench, Headset, Search, Clock, CalendarCheck, Sparkles } from "lucide-react";
import StudioCard from "@/components/StudioCard";
import { SkeletonGrid } from "@/components/Skeleton";
import { useApi } from "@/lib/use-api";
import { CATEGORIES } from "@/lib/constants";
import type { Studio } from "@/lib/types";

const slides = [
  { img: "https://picsum.photos/seed/hero1/1600/800", h: "The cyc wall you need is free on Saturday.", p: "Rent photo studios by the hour, with the lights already hung." },
  { img: "https://picsum.photos/seed/hero2/1600/800", h: "Roll camera on a real sound stage.", p: "Book grids, green screens and green rooms without a studio contract." },
  { img: "https://picsum.photos/seed/hero3/1600/800", h: "Your spare room could pay for your gear.", p: "List a podcast lounge, music suite or workshop and set your own rate." },
];
const icons = [Camera, Clapperboard, Mic, Music, Palette];
const steps = [[Search, "Discover Spaces", "Filter by category, price and location."], [Clock, "Select Shoot Hours", "Pick a date, start and end time."], [CalendarCheck, "Book Instantly", "Send a request. Confirmed slots can't be double-booked."], [Sparkles, "Create & Produce", "Show up, set up, and make the thing."]] as const;
const promises = [[ShieldCheck, "Liability protection", "Every confirmed booking is covered for accidental damage."], [BadgeCheck, "Verified profiles", "Hosts and guests both sign in before they can book or list."], [Wrench, "Equipment safety", "Listings state their gear and security deposit up front."], [Headset, "24/7 host support", "A real person answers if something goes wrong mid-shoot."]] as const;

export default function Home() {
  const { data, loading, error } = useApi<Studio[]>("/studios?limit=6&sort=top");
  return (
    <>
      <section>
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop className="h-[560px]">
          {slides.map((s) => (
            <SwiperSlide key={s.h}>
              <div className="relative h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="wrap relative flex h-full flex-col justify-center gap-5 text-white">
                  <h1 className="rise max-w-2xl text-4xl font-extrabold sm:text-6xl">{s.h}</h1>
                  <p className="rise max-w-xl text-lg text-white/85">{s.p}</p>
                  <div className="rise flex flex-wrap gap-3">
                    <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
                    <Link href="/studios" className="btn border border-white/60 text-white hover:bg-white/10">Host Your Space</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="wrap mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="h2">Featured studios</h2>
          <Link href="/studios" className="btn btn-ghost">See all</Link>
        </div>
        {loading ? <SkeletonGrid /> : error ? <p className="card p-6 text-red-500">{error}</p> : data?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.map((s) => <StudioCard key={s._id} s={s} />)}</div>
        ) : <p className="card p-8 text-center text-mute">No studios are listed yet. <Link href="/add-studio" className="font-semibold text-accent">List the first one</Link>.</p>}
      </section>

      <section className="wrap mt-20">
        <h2 className="h2 mb-8">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => { const I = icons[i]; return (
            <Link key={c.name} href={`/studios?category=${encodeURIComponent(c.name)}`} className="card flex h-full flex-col gap-3 p-5 transition hover:border-accent">
              <I className="h-8 w-8 text-accent" /><h3 className="text-lg font-bold">{c.label}</h3><p className="text-sm text-mute">{c.blurb}</p>
            </Link>); })}
        </div>
      </section>

      <section className="wrap mt-20">
        <h2 className="h2 mb-8">How booking works</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([I, t, d], i) => (
            <li key={t} className="card flex h-full flex-col gap-3 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent font-bold text-on">{i + 1}</span>
              <I className="h-6 w-6 text-accent" /><h3 className="text-lg font-bold">{t}</h3><p className="text-sm text-mute">{d}</p>
            </li>))}
        </ol>
      </section>

      <section className="wrap mt-20">
        <h2 className="h2 mb-8">Host guarantee and creator support</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(([I, t, d]) => (
            <div key={t} className="card flex h-full flex-col gap-3 p-5"><I className="h-7 w-7 text-accent" /><h3 className="text-lg font-bold">{t}</h3><p className="text-sm text-mute">{d}</p></div>))}
        </div>
      </section>
    </>
  );
}
