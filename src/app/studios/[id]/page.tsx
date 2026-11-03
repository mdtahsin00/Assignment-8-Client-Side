
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import StudioDetails from "@/app/component/StudioDetails";
import { studiosCollection } from "@/app/lib/mongodb";
import type { IStudio } from "@/app/types/studio";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Studio Content
const StudioContent = async ({ params }: PageProps) => {

  // Dynamic params inside Suspense
  const { id } = await params;

  // Fetch Studio Data
  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const doc = await studiosCollection.findOne({ _id: new ObjectId(id) });

  if (!doc) {
    notFound();
  }

  const studio = {
    ...doc,
    _id: doc._id.toString(),
  } as unknown as IStudio;

  return <StudioDetails studio={studio} />;
};

// Loading UI
const StudioLoading = () => {
  return (
    <main className="min-h-screen bg-[#080D1A] px-6 py-12">
      <div className="mx-auto max-w-7xl animate-pulse">

        <div className="mb-8 h-10 w-2/3 rounded-lg bg-white/10" />

        <div className="h-[450px] rounded-2xl bg-white/10" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="h-40 rounded-xl bg-white/10 md:col-span-2" />
          <div className="h-40 rounded-xl bg-white/10" />
        </div>

      </div>
    </main>
  );
};

// Main Page
const StudioDetailsPage = ({ params }: PageProps) => {
  return (
    <Suspense fallback={<StudioLoading />}>
      <StudioContent params={params} />
    </Suspense>
  );
};

export default StudioDetailsPage;
