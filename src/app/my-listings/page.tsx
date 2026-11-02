"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import type { Studio } from "../lib/studio";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userId = user?.id;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Private route: send visitors to the sign-in page
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signIn");
    }
  }, [isPending, session?.user, router]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/studios");
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error ?? "Could not load listings.");
        if (!cancelled) setStudios(data.studios ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load listings.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (isPending || !user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#0b0b0c] px-5 py-20">
        <p className="text-sm text-neutral-400">
          {isPending ? "Loading…" : "Redirecting to sign in…"}
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 bg-[#0b0b0c] px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              My Studio Listings
            </h1>
            <p className="mt-3 text-sm text-neutral-400">
              {user.name} · {user.email}
            </p>
          </div>
          <Link
            href="/add-studio"
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
          >
            + Add New Studio
          </Link>
        </div>

        {/* Body */}
        <div className="mt-9">
          {loading ? (
            <p className="text-sm text-neutral-400">Loading your listings…</p>
          ) : error ? (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-400"
            >
              {error}
            </p>
          ) : studios.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-white">
                No studios listed yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-neutral-400">
                Publish your first space and start earning hourly bookings from
                certified creators.
              </p>
              <Link
                href="/add-studio"
                className="mt-6 inline-block rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
              >
                Add New Studio →
              </Link>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <li
                  key={studio._id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-amber-400/40"
                >
                  <div className="relative h-40 bg-white/[0.05]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={studio.imageUrl}
                      alt={studio.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold tracking-wider text-amber-300 uppercase backdrop-blur">
                      {studio.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="text-sm font-bold text-white line-clamp-2">
                      {studio.title}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-400 line-clamp-1">
                      {studio.location}
                    </p>

                    <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-white/[0.04] py-2">
                        <dt className="text-[10px] text-neutral-500">RATE/HR</dt>
                        <dd className="text-xs font-bold text-amber-300">
                          {money.format(studio.hourlyRate)}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-white/[0.04] py-2">
                        <dt className="text-[10px] text-neutral-500">DEPOSIT</dt>
                        <dd className="text-xs font-bold text-white">
                          {money.format(studio.securityDeposit)}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-white/[0.04] py-2">
                        <dt className="text-[10px] text-neutral-500">CAPACITY</dt>
                        <dd className="text-xs font-bold text-white">
                          {studio.maxCapacity}
                        </dd>
                      </div>
                    </dl>

                    {studio.amenities.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {studio.amenities.slice(0, 4).map((amenity) => (
                          <li
                            key={amenity}
                            className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-neutral-300"
                          >
                            {amenity}
                          </li>
                        ))}
                        {studio.amenities.length > 4 && (
                          <li className="text-[10px] text-neutral-500">
                            +{studio.amenities.length - 4} more
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
