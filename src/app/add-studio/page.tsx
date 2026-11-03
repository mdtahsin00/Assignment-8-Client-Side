"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import {
  STUDIO_AMENITIES,
  STUDIO_CATEGORIES,
  validateStudioInput,
} from "../lib/studio";

type Toast = { type: "success" | "error"; message: string } | null;

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [amenities, setAmenities] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [submitting, setSubmitting] = useState(false);

  // Private route: send visitors to the sign-in page
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signIn");
    }
  }, [isPending, session?.user, router]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const asString = (key: string) => String(formData.get(key) ?? "").trim();

    const payload = {
      title: asString("title"),
      category: asString("category"),
      hourlyRate: Number(asString("hourlyRate")),
      securityDeposit: Number(asString("securityDeposit") || 0),
      maxCapacity: Number(asString("maxCapacity")),
      location: asString("location"),
      imageUrl: asString("imageUrl"),
      amenities,
      overview: asString("overview"),
    };

    const errors = validateStudioInput(payload);
    if (errors.length > 0) {
      setFormError(errors.join(" "));
      setToast({
        type: "error",
        message: "Please fix the highlighted problems.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to add studio");
      }

      setToast({
        type: "success",
        message: "Studio listed! Redirecting to your listings…",
      });
      setTimeout(() => router.push("/my-listings"), 2000);
    } catch (error) {
      setSubmitting(false);
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setFormError(message);
      setToast({ type: "error", message });
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 px-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-amber-400/60 focus:bg-white/[0.06]";

  const labelClass = "mb-2 block text-xs text-neutral-400";

  // Private route guard
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
    <main className="flex flex-1 justify-center bg-[#0b0b0c] px-5 py-14 sm:px-8">
      <div className="w-full max-w-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Add New Studio
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          List your space so certified creators can book it by the hour.
        </p>

        <form onSubmit={onSubmit} noValidate>
          {/* Title */}
          <div className="mt-6">
            <label htmlFor="title" className={labelClass}>
              Studio Title <span className="text-amber-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              maxLength={100}
              placeholder="e.g. The Daylight Loft at DUMBO — Cyclorama"
              className={inputClass}
            />
          </div>

          {/* Category + pricing */}
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="category" className={labelClass}>
                Category <span className="text-amber-400">*</span>
              </label>
              <select
                id="category"
                name="category"
                defaultValue=""
                className={`${inputClass} appearance-none`}
              >
                <option
                  value=""
                  disabled
                  className="bg-[#0b0b0c] text-neutral-500"
                >
                  Select a category
                </option>
                {STUDIO_CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-[#0b0b0c] text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hourlyRate" className={labelClass}>
                Hourly Rate ($) <span className="text-amber-400">*</span>
              </label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min={1}
                step="1"
                placeholder="85"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="securityDeposit" className={labelClass}>
                Security Deposit ($)
              </label>
              <input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                min={0}
                step="1"
                placeholder="500"
                className={inputClass}
              />
            </div>
          </div>

          {/* Capacity + location */}
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="maxCapacity" className={labelClass}>
                Max Capacity <span className="text-amber-400">*</span>
              </label>
              <input
                id="maxCapacity"
                name="maxCapacity"
                type="number"
                min={1}
                step="1"
                placeholder="12"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="location" className={labelClass}>
                Location / Address <span className="text-amber-400">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Street address, City, State, Postal code"
                className={inputClass}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="mt-5">
            <label htmlFor="imageUrl" className={labelClass}>
              Image URL <span className="text-amber-400">*</span>
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://…/studio-cover.jpg"
              className={inputClass}
            />
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <p className={labelClass}>Amenities</p>
            <div className="flex flex-wrap gap-2">
              {STUDIO_AMENITIES.map((amenity) => {
                const active = amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleAmenity(amenity)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                      active
                        ? "border-amber-400/70 bg-amber-400/15 text-amber-300"
                        : "border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {active ? "✓ " : ""}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <label htmlFor="overview" className={labelClass}>
              Detailed Overview <span className="text-amber-400">*</span>
            </label>
            <textarea
              id="overview"
              name="overview"
              rows={6}
              maxLength={2000}
              placeholder="Describe the space, lighting, power, access hours, house rules…"
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Error */}
          {formError && (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-400"
            >
              {formError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Publishing listing…" : "Publish Studio Listing →"}
          </button>

          <p className="mt-4 text-center text-[11px] text-neutral-500">
            Need a break?{" "}
            <Link href="/" className="font-semibold text-white underline">
              Back to home
            </Link>
          </p>
        </form>

        {/* Toast */}
        <div aria-live="polite">
          {toast && (
            <div className="toast toast-end fixed z-[100]">
              <div
                className={`rounded-xl px-5 py-3 text-sm font-semibold shadow-lg ${
                  toast.type === "error"
                    ? "bg-red-500 text-white"
                    : "bg-emerald-500 text-black"
                }`}
              >
                {toast.message}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
