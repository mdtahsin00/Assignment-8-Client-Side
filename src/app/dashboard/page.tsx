"use client";
import Link from "next/link";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import { Spinner } from "@/components/Skeleton";
import { useAuth } from "@/app/providers";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { STATUS_STYLE } from "@/lib/constants";
import type { Booking, Studio } from "@/lib/types";

function Inner() {
  const { user } = useAuth();
  const studios = useApi<Studio[]>("/studios/mine");
  const mine = useApi<Booking[]>("/bookings/mine");
  const incoming = useApi<Booking[]>("/bookings/incoming");
  if (studios.loading || mine.loading || incoming.loading) return <Spinner label="Loading dashboard" />;
  const pending = (incoming.data || []).filter((b) => b.status === "Pending").length;
  const stats = [["My listings", studios.data?.length ?? 0], ["My bookings", mine.data?.length ?? 0], ["Requests awaiting you", pending]];

  async function setStatus(id: string, status: string) {
    try { await api(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }); toast.success(`Booking ${status.toLowerCase()}.`); incoming.reload(); }
    catch (e: any) { toast.error(e.message); }
  }
  return (
    <div className="wrap py-10">
      <h1 className="h2">Hi, {user?.name.split(" ")[0]}</h1>
      <div className="my-6 grid gap-4 sm:grid-cols-3">{stats.map(([l, n]) => <div key={l} className="card p-5"><p className="text-3xl font-extrabold text-accent">{n}</p><p className="text-sm text-mute">{l}</p></div>)}</div>
      <h2 className="mb-4 text-2xl font-bold">Booking requests for your studios</h2>
      {incoming.data?.length ? (
        <div className="space-y-3">{incoming.data.map((b) => (
          <div key={b._id} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-bold">{b.studioTitle}</p><p className="text-sm text-mute">{b.userName} · {b.date}, {b.startTime} to {b.endTime} · ${b.total}</p>{b.notes && <p className="mt-1 text-sm">&ldquo;{b.notes}&rdquo;</p>}</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${STATUS_STYLE[b.status]}`}>{b.status}</span>
              {b.status === "Pending" && <button className="btn btn-primary !py-1.5" onClick={() => setStatus(b._id, "Confirmed")}>Confirm</button>}
              {b.status === "Confirmed" && <button className="btn btn-primary !py-1.5" onClick={() => setStatus(b._id, "Completed")}>Mark completed</button>}
              {["Pending", "Confirmed"].includes(b.status) && <button className="btn btn-ghost !py-1.5" onClick={() => setStatus(b._id, "Cancelled")}>Decline</button>}
            </div>
          </div>))}</div>
      ) : <div className="card p-8 text-center text-mute">No requests yet. <Link href="/add-studio" className="font-semibold text-accent">List a studio</Link> to start receiving bookings.</div>}
    </div>
  );
}
export default function Dashboard() { return <PrivateRoute><Inner /></PrivateRoute>; }
