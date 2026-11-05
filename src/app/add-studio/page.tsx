"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import { api } from "@/lib/api";

export default function AddStudio() {
  const router = useRouter();
  return (
    <PrivateRoute>
      <div className="wrap max-w-4xl py-10">
        <h1 className="h2">Add a new studio</h1>
        <p className="mb-6 mt-2 text-mute">Tell creators what the room offers and what it costs.</p>
        <StudioForm submitLabel="Publish studio" onSubmit={async (d) => {
          await api("/studios", { method: "POST", body: JSON.stringify(d) });
          toast.success("Your studio is live.");
          router.push("/my-listings");
        }} />
      </div>
    </PrivateRoute>
  );
}
