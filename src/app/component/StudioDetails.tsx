
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Star,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Wallet,
} from "lucide-react";
import type { IStudio } from "@/app/types/studio";
import { authClient } from "../lib/auth-client";

interface StudioDetailsProps {
  studio: IStudio;
}

const StudioDetails = ({ studio }: StudioDetailsProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const images = [
    studio.imageUrl,
    ...(studio.galleryImages ?? []),
  ];
  const { data: session } = authClient.useSession();

  const totalPrice = studio.hourlyRate * hours;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

const handleBooking = async (e: React.FormEvent) => {
  e.preventDefault();

  // Check user login
  if (!session?.user) {
    alert("Please login before booking!");
    return;
  }

  const bookingData = {
    studioId: studio._id,
    bookingDate,
    startTime,
    hours,
  };

  try {
    const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setBookingDate("");
      setStartTime("");
      setHours(1);
      setShowConfirmation(true);
    } else {
      alert(data.error || data.message || "Booking Failed!");
    }
  } catch (error) {
    console.error("Booking Error:", error);
    alert("Something went wrong!");
  }
};

  return (
    <main className="min-h-screen bg-[#080D1A] px-4 py-10 text-white md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            {studio.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold md:text-5xl">
            {studio.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-400">

            <span className="flex items-center gap-2">
              <MapPin size={17} className="text-violet-400" />
              {studio.location}
            </span>

            <span className="flex items-center gap-2">
              <Star size={17} className="fill-yellow-400 text-yellow-400" />
              {studio.rating ?? "New"} Rating
            </span>

            <span className="flex items-center gap-2">
              <Users size={17} className="text-violet-400" />
              Up to {studio.maxCapacity} people
            </span>

          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid gap-3 md:grid-cols-4">

          <div className="relative h-[350px] overflow-hidden rounded-2xl md:col-span-3 md:h-[500px]">

            <Image
              src={images[activeImage]}
              alt={studio.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur hover:bg-violet-600"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur hover:bg-violet-600"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-4 py-2 text-sm">
              {activeImage + 1} / {images.length}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">

            {images.slice(0, 2).map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setActiveImage(index)}
                className={`relative h-40 overflow-hidden rounded-xl md:h-[244px] ${
                  activeImage === index
                    ? "ring-2 ring-violet-500"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`${studio.title} gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </button>
            ))}

          </div>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold">
                About This Workspace
              </h2>

              <p className="mt-4 leading-8 text-gray-400">
                {studio.overview}
              </p>
            </section>

            <div className="border-t border-white/10" />

            {/* Specifications */}
            <section>
              <h2 className="text-2xl font-bold">
                Workspace Specifications
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <Specification
                  icon={<Clock />}
                  label="Hourly Rate"
                  value={`৳${studio.hourlyRate}/hour`}
                />

                <Specification
                  icon={<Wallet />}
                  label="Security Deposit"
                  value={`৳${studio.securityDeposit}`}
                />

                <Specification
                  icon={<Users />}
                  label="Maximum Capacity"
                  value={`${studio.maxCapacity} People`}
                />

                <Specification
                  icon={<ShieldCheck />}
                  label="Workspace Category"
                  value={studio.category}
                />

              </div>
            </section>

            <div className="border-t border-white/10" />

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold">
                What This Studio Offers
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {studio.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle
                      size={19}
                      className="shrink-0 text-violet-400"
                    />
                    {amenity}
                  </div>
                ))}

              </div>
            </section>

            <div className="border-t border-white/10" />

            {/* Host Information */}
            <section>
              <h2 className="text-2xl font-bold">
                Meet Your Host
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20 text-violet-400">
                  <User size={32} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {studio.hostName || "Studio Host"}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Workspace Owner
                  </p>

                  {studio.ownerEmail && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                      <Mail size={15} />
                      {studio.ownerEmail}
                    </p>
                  )}
                </div>

              </div>
            </section>

            <div className="border-t border-white/10" />

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-bold">
                Guest Reviews
              </h2>

              {studio.reviews?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {studio.reviews.map((review, index) => (
                    <div
                      key={`${review.name}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {review.name}
                        </h3>

                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star size={15} className="fill-yellow-400" />
                          {review.rating}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {review.comment}
                      </p>

                      <p className="mt-3 text-xs text-gray-500">
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-400">
                  No reviews yet. Be the first to review this workspace!
                </p>
              )}
            </section>

          </div>

          {/* Booking Card */}
          <aside>
            <div className="sticky top-8 rounded-2xl border border-violet-500/30 bg-[#111827] p-6 shadow-xl shadow-violet-500/5">

              <p className="text-sm text-gray-400">
                Starting from
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                ৳{studio.hourlyRate}
                <span className="text-base font-normal text-gray-400">
                  {" "}/ hour
                </span>
              </h2>

              <div className="my-6 space-y-4 text-sm text-gray-300">

                <div className="flex justify-between">
                  <span>Hourly Rate</span>
                  <span>৳{studio.hourlyRate}</span>
                </div>

                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span>৳{studio.securityDeposit}</span>
                </div>

                <div className="flex justify-between">
                  <span>Maximum Capacity</span>
                  <span>{studio.maxCapacity} People</span>
                </div>

              </div>

              <button
                onClick={() => {
                  setBookingOpen(true);
                  setShowConfirmation(false);
                }}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 font-bold text-white transition hover:from-violet-500 hover:to-indigo-500"
              >
                Book Workspace Now
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                No payment required to send a booking request.
              </p>

            </div>
          </aside>

        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="relative my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">

            <button
              onClick={() => setBookingOpen(false)}
              aria-label="Close booking modal"
              className="absolute right-5 top-5 text-gray-400 hover:text-white"
            >
              <X size={22} />
            </button>

            {showConfirmation ? (
              <div className="py-8 text-center">
                <CheckCircle
                  size={55}
                  className="mx-auto text-green-400"
                />

                <h2 className="mt-5 text-2xl font-bold">
                  Booking Request Sent!
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Your request has been sent to the studio host.
                  You can track its status on the My Bookings page.
                </p>

                <button
                  onClick={() => {
                    setBookingOpen(false);
                    setShowConfirmation(false);
                  }}
                  className="mt-6 rounded-xl bg-violet-600 px-8 py-3 font-semibold hover:bg-violet-500"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  Book This Workspace
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Complete the details to request your booking.
                </p>

                <form
                  onSubmit={handleBooking}
                  className="mt-7 space-y-5"
                >

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Booking Date
                    </label>

                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#080D1A] p-3 text-white outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Starting Time
                    </label>

                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#080D1A] p-3 text-white outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Booking Duration (Hours)
                    </label>

                    <input
                      type="number"
                      min="1"
                      max="24"
                      required
                      value={hours}
                      onChange={(e) =>
                        setHours(Math.max(1, Math.min(24, Number(e.target.value) || 1)))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#080D1A] p-3 text-white outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {hours} hour(s) × ৳{studio.hourlyRate}
                      </span>

                      <span>৳{totalPrice}</span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                      <span className="text-gray-300">
                        Security Deposit
                      </span>

                      <span>৳{studio.securityDeposit}</span>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Estimated Total</span>
                        <span className="text-violet-400">
                          ৳{totalPrice + studio.securityDeposit}
                        </span>
                      </div>
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 font-bold hover:opacity-90"
                  >
                    Send Booking Request
                  </button>

                </form>
              </>
            )}

          </div>
        </div>
      )}

    </main>
  );
};

interface SpecificationProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Specification = ({
  icon,
  label,
  value,
}: SpecificationProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-violet-400">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StudioDetails;
