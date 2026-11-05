"use client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import { Spinner } from "@/components/Skeleton";
import { useAuth } from "@/app/providers";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import type { Studio } from "@/lib/types";

function Inner() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { data: s, loading, error } = useApi<Studio>(`/studios/${id}`);
  if (loading) return <Spinner label="Loading listing" />;
  if (error || !s) return <p className="wrap py-20 text-center text-red-500">{error || "Studio not found."}</p>;
  if (s.ownerEmail !== user?.email) return <p className="wrap py-20 text-center">You can only edit your own listings.</p>;
  return (
    <div className="wrap max-w-4xl py-10">
      <h1 className="h2 mb-6">Edit studio</h1>
      <StudioForm initial={s} submitLabel="Save changes" onSubmit={async (d) => {
        await api(`/studios/${id}`, { method: "PUT", body: JSON.stringify(d) });
        toast.success("Studio updated.");
        router.push("/my-listings");
      }} />
    </div>
  );
}
export default function EditStudio() { return <PrivateRoute><Inner /></PrivateRoute>; }
