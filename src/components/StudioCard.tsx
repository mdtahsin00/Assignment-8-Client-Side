import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Studio } from "@/lib/types";

export default function StudioCard({ s }: { s: Studio }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative h-52 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.image} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
        <span className="badge absolute left-3 top-3 bg-ink text-bg">{s.category}</span>
        <span className="badge absolute right-3 top-3 gap-1 bg-card text-ink">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{s.rating ? s.rating.toFixed(1) : "New"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-lg font-bold">{s.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-mute"><MapPin className="h-4 w-4 shrink-0" /><span className="line-clamp-1">{s.location}</span></p>
        <p className="mt-auto pt-2 text-xl font-bold text-accent">${s.hourlyRate} <span className="text-sm font-medium text-mute">/ hr</span></p>
        <Link href={`/studios/${s._id}`} className="btn btn-primary w-full">View Details</Link>
      </div>
    </article>
  );
}
