"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/providers";
import { AMENITIES, CATEGORIES } from "@/lib/constants";
import type { Studio } from "@/lib/types";

const L = ({ t, children }: { t: string; children: React.ReactNode }) => <label className="block text-sm font-semibold">{t}<div className="mt-1 font-normal">{children}</div></label>;

export default function StudioForm({ initial, submitLabel, onSubmit }: { initial?: Partial<Studio>; submitLabel: string; onSubmit: (d: any) => Promise<void> }) {
  const { user } = useAuth();
  const [f, setF] = useState({
    title: initial?.title || "", category: initial?.category || CATEGORIES[0].name, hourlyRate: String(initial?.hourlyRate ?? ""),
    deposit: String(initial?.deposit ?? ""), capacity: String(initial?.capacity ?? ""), location: initial?.location || "",
    image: initial?.image || "", gallery: (initial?.gallery || []).join(", "), overview: initial?.overview || "",
  });
  const [amen, setAmen] = useState<string[]>(initial?.amenities || []);
  const [busy, setBusy] = useState(false);
  const [up, setUp] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<any>) => setF({ ...f, [k]: e.target.value });

  async function upload(file?: File) {
    if (!file) return;
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) { toast.error("Uploads need NEXT_PUBLIC_IMGBB_KEY. Paste an image URL instead."); return; }
    setUp(true);
    try {
      const fd = new FormData(); fd.append("image", file);
      const j = await (await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: fd })).json();
      if (!j.success) throw new Error();
      setF((p) => ({ ...p, image: j.data.url })); toast.success("Image uploaded.");
    } catch { toast.error("Upload failed. Paste an image URL instead."); } finally { setUp(false); }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!(Number(f.hourlyRate) > 0) || !(Number(f.capacity) > 0)) { toast.error("Hourly rate and capacity must be above zero."); return; }
    setBusy(true);
    try {
      await onSubmit({ ...f, hourlyRate: Number(f.hourlyRate), deposit: Number(f.deposit) || 0, capacity: Number(f.capacity), amenities: amen, gallery: f.gallery.split(",").map((s) => s.trim()).filter(Boolean) });
    } catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="card grid gap-5 p-6 sm:grid-cols-2">
      <div className="sm:col-span-2"><L t="Studio title"><input required className="input" value={f.title} onChange={set("title")} /></L></div>
      <L t="Category"><select className="input" value={f.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}</select></L>
      <L t="Location / address"><input required className="input" value={f.location} onChange={set("location")} /></L>
      <L t="Hourly rate ($)"><input required type="number" min="1" className="input" value={f.hourlyRate} onChange={set("hourlyRate")} /></L>
      <L t="Security deposit ($)"><input type="number" min="0" className="input" value={f.deposit} onChange={set("deposit")} /></L>
      <L t="Max capacity"><input required type="number" min="1" className="input" value={f.capacity} onChange={set("capacity")} /></L>
      <L t="Image URL"><input required type="url" className="input" value={f.image} onChange={set("image")} placeholder="https://..." /></L>
      <div className="sm:col-span-2"><L t="Or upload an image"><input type="file" accept="image/*" disabled={up} onChange={(e) => upload(e.target.files?.[0])} className="text-sm" />{up && <span className="ml-2 text-xs text-mute">Uploading...</span>}</L></div>
      <div className="sm:col-span-2"><L t="Extra gallery image URLs (comma separated, optional)"><input className="input" value={f.gallery} onChange={set("gallery")} /></L></div>
      <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-semibold">Amenities</legend>
        <div className="flex flex-wrap gap-2">{AMENITIES.map((a) => {
          const on = amen.includes(a);
          return <button type="button" key={a} onClick={() => setAmen(on ? amen.filter((x) => x !== a) : [...amen, a])} className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm ${on ? "border-accent bg-accent text-on" : "border-line"}`}>{a}</button>;
        })}</div>
      </fieldset>
      <div className="sm:col-span-2"><L t="Detailed overview"><textarea required rows={5} className="input" value={f.overview} onChange={set("overview")} /></L></div>
      <L t="Host name"><input readOnly className="input opacity-70" value={initial?.ownerName || user?.name || ""} /></L>
      <L t="Host email"><input readOnly className="input opacity-70" value={initial?.ownerEmail || user?.email || ""} /></L>
      <div className="sm:col-span-2"><button disabled={busy} className="btn btn-primary w-full sm:w-auto">{busy ? "Saving..." : submitLabel}</button></div>
    </form>
  );
}
