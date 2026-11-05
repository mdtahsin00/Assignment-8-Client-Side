"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import Modal from "@/components/Modal";
import { SkeletonGrid } from "@/components/Skeleton";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import type { Studio } from "@/lib/types";

function Inner() {
  const { data, loading, error, reload } = useApi<Studio[]>("/studios/mine");
  const [del, setDel] = useState<Studio | null>(null);
  async function remove() {
    if (!del) return;
    try { await api(`/studios/${del._id}`, { method: "DELETE" }); toast.success("Studio deleted."); setDel(null); reload(); }
    catch (e: any) { toast.error(e.message); }
  }
  return (
    <div className="wrap py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="h2">My studio listings</h1><Link href="/add-studio" className="btn btn-primary">Add New Studio</Link></div>
      {loading ? <SkeletonGrid n={3} /> : error ? <p className="text-red-500">{error}</p> : data?.length ? (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line text-mute"><tr><th className="p-4">Studio</th><th>Category</th><th>Rate</th><th>Location</th><th className="pr-4 text-right">Actions</th></tr></thead>
            <tbody>{data.map((s) => (
              <tr key={s._id} className="border-b border-line last:border-0">
                <td className="p-4"><div className="flex items-center gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.image} alt="" className="h-12 w-16 rounded-md object-cover" /><b>{s.title}</b></div></td>
                <td>{s.category}</td><td>${s.hourlyRate}/hr</td><td>{s.location}</td>
                <td className="pr-4"><div className="flex justify-end gap-2"><Link href={`/studios/edit/${s._id}`} className="btn btn-ghost !px-3 !py-1.5">Update</Link><button onClick={() => setDel(s)} className="btn btn-danger !px-3 !py-1.5">Delete</button></div></td>
              </tr>))}</tbody>
          </table>
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-3 p-12 text-center"><h3 className="text-xl font-bold">You haven&apos;t listed a studio yet</h3><p className="text-mute">Add your first space and start taking bookings.</p><Link href="/add-studio" className="btn btn-primary">Add New Studio</Link></div>
      )}
      <Modal open={!!del} onClose={() => setDel(null)} title="Delete this listing?">
        <p className="mb-5 text-sm text-mute">&ldquo;{del?.title}&rdquo; will be removed permanently. This can&apos;t be undone.</p>
        <div className="flex justify-end gap-2"><button className="btn btn-ghost" onClick={() => setDel(null)}>Keep it</button><button className="btn btn-danger" onClick={remove}>Delete studio</button></div>
      </Modal>
    </div>
  );
}
export default function MyListings() { return <PrivateRoute><Inner /></PrivateRoute>; }
