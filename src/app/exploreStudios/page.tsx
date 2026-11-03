
import { Suspense } from "react";
import StudioCard from "@/app/component/StudioCard";
import type { IStudio } from "@/app/types/studio";

// Fetch and display studios
const StudiosList = async () => {
  const res = await fetch("http://localhost:5000/allStudio", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios: IStudio[] = await res.json();

  if (studios.length === 0) {
    return (
      <p className="py-20 text-center text-gray-400">
        No studios available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
};

// Loading fallback
const StudiosLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="h-96 animate-pulse rounded-2xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
};

const StudiosPage = () => {
  return (
    <main className="min-h-screen bg-[#080D1A] px-6 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-violet-400">
            Discover Creative Spaces
          </p>

          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Explore <span className="text-violet-400">Studios</span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Find the perfect creative space for your next big idea.
            Explore professional studios and book your next session.
          </p>
        </div>

        {/* Studio Listings */}
        <Suspense fallback={<StudiosLoading />}>
          <StudiosList />
        </Suspense>

      </div>
    </main>
  );
};

export default StudiosPage;
