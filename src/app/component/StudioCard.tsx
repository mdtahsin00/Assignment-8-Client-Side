import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { IStudio } from "@/app/types/studio";

interface StudioCardProps {
  studio: IStudio;
}

const StudioCard = ({ studio }: StudioCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition-all duration-300 hover:-translate-y-2">

      <div className="relative h-56">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {studio.category}
        </span>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-white">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          4.8
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-white">
          {studio.title}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
          <MapPin size={16} />
          {studio.location}
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-gray-400">
          {studio.overview}
        </p>

        <div className="my-5 border-t border-white/10" />

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-white">
            ৳{studio.hourlyRate}
            <span className="text-sm font-normal text-gray-400">/hour</span>
          </p>

          <Link
            href={`/studios/${studio._id}`}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudioCard;