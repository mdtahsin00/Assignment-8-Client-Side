"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import type { Booking } from "../lib/booking";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  Approved: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  Rejected: "bg-red-400/15 text-red-300 border-red-400/30",
};

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userId = user?.id;

  const [bookings, setBookings] = useState<Booking[]>([]);
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
        const res = await fetch("/api/bookings");
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error ?? "Could not load bookings.");
        if (!cancelled) setBookings(data.bookings ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load bookings.");
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            {user.name} · {user.email}
          </p>
        </div>

        {/* Body */}
        <div className="mt-9">
          {loading ? (
            <p className="text-sm text-neutral-400">Loading your bookings…</p>
          ) : error ? (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-400"
            >
              {error}
            </p>
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-white">
                No bookings yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-neutral-400">
                Find a studio you love and send a booking request — your
                requests will show up here.
              </p>
              <Link
                href="/exploreStudios"
                className="mt-6 inline-block rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
              >
                Explore Studios →
              </Link>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-amber-400/40"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-sm font-bold text-white line-clamp-2">
                        {booking.studioTitle}
                      </h2>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                          statusStyles[booking.status] ??
                          "border-white/15 bg-white/[0.05] text-neutral-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-white/[0.04] py-2">
                        <dt className="text-[10px] text-neutral-500">DATE</dt>
                        <dd className="text-xs font-bold text-white">
                          {booking.bookingDate}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-white/[0.04] py-2">
                        <dt className="text-[10px] text-neutral-500">START</dt>
                        <dd className="text-xs font-bold text-white">
                          {booking.startTime}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-white/[0.04] py-2">
                        <dt className="text-[10px] text-neutral-500">HOURS</dt>
                        <dd className="text-xs font-bold text-white">
                          {booking.hours}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-[10px] tracking-wider text-neutral-500 uppercase">
                        Total
                      </span>
                      <span className="text-sm font-bold text-amber-300">
                        {money.format(booking.totalPrice)}
                      </span>
                    </div>
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
