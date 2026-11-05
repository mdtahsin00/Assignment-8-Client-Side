"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Check, MapPin, Star, Users } from "lucide-react";
import { toast } from "sonner";
import BookingModal from "@/components/BookingModal";
import { Spinner } from "@/components/Skeleton";
import { useAuth } from "@/app/providers";
import { useApi } from "@/lib/use-api";
import type { Studio } from "@/lib/types";

export default function StudioDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { data: s, loading, error } = useApi<Studio>(`/studios/${id}`);
  const [open, setOpen] = useState(false);

  if (loading) return <Spinner label="Loading studio" />;
  if (error || !s) return (
    <div className="wrap py-20 text-center"><h1 className="h2">Studio not found</h1><p className="mt-2 text-mute">{error}</p><Link href="/studios" className="btn btn-primary mt-6">Back to studios</Link></div>
  );
  const images = [s.image, ...(s.gallery || [])];
  function book() {
    if (!user) { toast.info("Log in to book this studio."); router.push(`/login?next=/studios/${id}`); return; }
    setOpen(true);
  }
  return (
    <div className="wrap grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="min-w-0 space-y-8">
        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="aspect-[16/10] w-full overflow-hidden rounded-xl">
          {images.map((src, i) => <SwiperSlide key={i}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={src} alt={`${s.title} photo ${i + 1}`} className="h-full w-full object-cover" /></SwiperSlide>)}
        </Swiper>
        <section><h2 className="mb-3 text-2xl font-bold">Overview</h2><p className="leading-relaxed text-mute">{s.overview}</p></section>
        <section>
          <h2 className="mb-3 text-2xl font-bold">Amenities</h2>
          <ul className="grid gap-2 sm:grid-cols-2">{s.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-accent" />{a}</li>)}</ul>
        </section>
        <section>
          <h2 className="mb-3 text-2xl font-bold">Reviews</h2>
          {s.reviews?.length ? <div className="space-y-3">{s.reviews.map((r, i) => (
            <div key={i} className="card p-4"><div className="flex items-center justify-between"><b>{r.name}</b><span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{r.rating}</span></div><p className="mt-1 text-sm text-mute">{r.comment}</p></div>))}</div>
            : <p className="card p-6 text-mute">No reviews yet. Be the first creator to book and review this space.</p>}
        </section>
      </div>

      <aside className="h-fit space-y-5 lg:sticky lg:top-24">
        <div className="card space-y-4 p-6">
          <span className="badge bg-ink text-bg">{s.category}</span>
          <h1 className="text-3xl font-extrabold">{s.title}</h1>
          <p className="flex items-center gap-2 text-sm text-mute"><MapPin className="h-4 w-4" />{s.location}</p>
          <div className="flex flex-wrap gap-4 text-sm"><span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{s.rating ? s.rating.toFixed(1) : "New"}</span><span className="flex items-center gap-1"><Users className="h-4 w-4" />Up to {s.capacity} people</span></div>
          <p className="text-3xl font-bold text-accent">${s.hourlyRate}<span className="text-base font-medium text-mute"> / hr</span></p>
          <p className="text-sm text-mute">Security deposit: ${s.deposit}</p>
          <button onClick={book} className="btn btn-primary w-full">Book Workspace Now</button>
        </div>
        <div className="card flex items-center gap-3 p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {s.ownerImage ? <img src={s.ownerImage} alt="" className="h-12 w-12 rounded-full object-cover" /> : <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-bold text-on">{s.ownerName[0]}</span>}
          <div><p className="text-xs text-mute">Hosted by</p><p className="font-bold">{s.ownerName}</p><p className="text-xs text-mute">{s.ownerEmail}</p></div>
        </div>
      </aside>
      <BookingModal studio={s} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
