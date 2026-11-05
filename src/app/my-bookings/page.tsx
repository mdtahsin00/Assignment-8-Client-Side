"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import Modal from "@/components/Modal";
import { SkeletonGrid } from "@/components/Skeleton";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { STATUS_STYLE } from "@/lib/constants";
import type { Booking } from "@/lib/types";

function Inner() {
  const { data, loading, error, reload } = useApi<Booking[]>("/bookings/mine");
  const [target, setTarget] = useState<Booking | null>(null);
  async function cancel() {
    if (!target) return;
    try { await api(`/bookings/${target._id}`, { method: "PATCH", body: JSON.stringify({ status: "Cancelled" }) }); toast.success("Booking cancelled."); setTarget(null); reload(); }
    catch (e: any) { toast.error(e.message); }
  }
  return (
    <div className="wrap py-10">
      <h1 className="h2 mb-6">My bookings</h1>
      {loading ? <SkeletonGrid n={3} /> : error ? <p className="text-red-500">{error}</p> : data?.length ? (
        <div className="space-y-4">{data.map((b) => (
          <div key={b._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.studioImage} alt="" className="h-28 w-full rounded-md object-cover sm:w-44" />
            <div className="flex-1 space-y-1">
              <Link href={`/studios/${b.studioId}`} className="text-lg font-bold hover:text-accent">{b.studioTitle}</Link>
              <p className="text-sm text-mute">{b.date}, {b.startTime} to {b.endTime} ({b.hours} hr)</p>
              <p className="text-sm font-semibold">Total ${b.total} <span className="font-normal text-mute">+ ${b.deposit} deposit</span></p>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
              <span className={`badge ${STATUS_STYLE[b.status]}`}>{b.status}</span>
              {b.status === "Pending" && <button className="btn btn-ghost !py-1.5" onClick={() => setTarget(b)}>Cancel Booking</button>}
            </div>
          </div>))}</div>
      ) : (
        <div className="card flex flex-col items-center gap-3 p-12 text-center"><h3 className="text-xl font-bold">No bookings yet</h3><p className="text-mute">Find a space and send your first request.</p><Link href="/studios" className="btn btn-primary">Explore Studios</Link></div>
      )}
      <Modal open={!!target} onClose={() => setTarget(null)} title="Cancel this booking?">
        <p className="mb-5 text-sm text-mute">Your request for {target?.studioTitle} on {target?.date} will be cancelled.</p>
        <div className="flex justify-end gap-2"><button className="btn btn-ghost" onClick={() => setTarget(null)}>Keep booking</button><button className="btn btn-danger" onClick={cancel}>Cancel booking</button></div>
      </Modal>
    </div>
  );
}
export default function MyBookings() { return <PrivateRoute><Inner /></PrivateRoute>; }
