import Link from "next/link";

export default function About() {
  return (
    <div className="wrap max-w-4xl py-12">
      <h1 className="h2">About StudioSpace</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-mute">
        <p>StudioSpace is a peer-to-peer marketplace for creative rooms. Photographers, filmmakers, podcasters, musicians and artists rent the space they need by the hour, and studio owners earn from time that would otherwise sit empty.</p>
        <p>We built it because booking a good room still means long email threads and unclear prices. Every listing here shows its rate, deposit, capacity and gear before you ask.</p>
        <p>Bookings are requests until a host confirms them. Once confirmed, the slot is locked, so two crews never turn up for the same hour.</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[["5", "studio categories"], ["$/hr", "transparent pricing"], ["0", "double bookings"]].map(([n, l]) => <div key={l} className="card p-5"><p className="text-3xl font-extrabold text-accent">{n}</p><p className="text-sm text-mute">{l}</p></div>)}
      </div>
      <Link href="/studios" className="btn btn-primary mt-8">Find a studio</Link>
    </div>
  );
}
