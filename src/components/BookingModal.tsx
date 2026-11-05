"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Modal from "./Modal";
import { api } from "@/lib/api";
import type { Studio } from "@/lib/types";

export default function BookingModal({ studio, open, onClose }: { studio: Studio; open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [f, setF] = useState({ date: "", startTime: "10:00", endTime: "12:00", notes: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const hours = f.startTime && f.endTime ? (Number(f.endTime.slice(0, 2)) * 60 + Number(f.endTime.slice(3)) - Number(f.startTime.slice(0, 2)) * 60 - Number(f.startTime.slice(3))) / 60 : 0;
  const total = Math.max(hours, 0) * studio.hourlyRate;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      await api("/bookings", { method: "POST", body: JSON.stringify({ studioId: studio._id, ...f }) });
      toast.success("Booking request sent. The host will confirm it soon.");
      onClose();
      router.push("/my-bookings");
    } catch (e: any) { setErr(e.message); toast.error(e.message); } finally { setBusy(false); }
  }
  return (
    <Modal open={open} onClose={onClose} title={`Book ${studio.title}`}>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold">Date
          <input required type="date" min={new Date().toISOString().slice(0, 10)} className="input mt-1" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-semibold">Start<input required type="time" className="input mt-1" value={f.startTime} onChange={(e) => setF({ ...f, startTime: e.target.value })} /></label>
          <label className="block text-sm font-semibold">End<input required type="time" className="input mt-1" value={f.endTime} onChange={(e) => setF({ ...f, endTime: e.target.value })} /></label>
        </div>
        <label className="block text-sm font-semibold">Notes for the host (optional)
          <textarea className="input mt-1" rows={3} maxLength={500} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
        </label>
        <div className="rounded-md bg-bg p-3 text-sm">
          <div className="flex justify-between"><span>{hours > 0 ? hours : 0} hr × ${studio.hourlyRate}</span><b>${total}</b></div>
          <div className="mt-1 flex justify-between text-mute"><span>Refundable security deposit</span><span>${studio.deposit}</span></div>
        </div>
        {err && <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">{err}</p>}
        <button disabled={busy} className="btn btn-primary w-full">{busy ? "Sending..." : "Send booking request"}</button>
      </form>
    </Modal>
  );
}
