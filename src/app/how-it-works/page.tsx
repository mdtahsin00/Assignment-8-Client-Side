import Link from "next/link";

const guest = ["Search studios by category, location and hourly rate.", "Open a listing to check amenities, capacity, deposit and reviews.", "Choose a date and hours, then send a booking request.", "Once the host confirms, the slot is locked and nobody else can book it."];
const host = ["Create an account and add your space with photos and amenities.", "Set your hourly rate, deposit and capacity.", "Confirm or decline requests from your dashboard.", "Mark bookings completed after the session."];

export default function HowItWorks() {
  return (
    <div className="wrap max-w-5xl py-12">
      <h1 className="h2">How StudioSpace works</h1>
      <p className="mb-8 mt-2 max-w-2xl text-mute">Two sides, one calendar. Here is what happens for creators who book and hosts who list.</p>
      <div className="grid gap-6 md:grid-cols-2">
        {[["For creators", guest], ["For hosts", host]].map(([t, items]) => (
          <section key={t as string} className="card p-6"><h2 className="mb-4 text-2xl font-bold">{t as string}</h2>
            <ol className="list-decimal space-y-3 pl-5 text-mute">{(items as string[]).map((i) => <li key={i}>{i}</li>)}</ol></section>))}
      </div>
      <div className="mt-8 flex gap-3"><Link href="/studios" className="btn btn-primary">Explore Studios</Link><Link href="/add-studio" className="btn btn-ghost">Host Your Space</Link></div>
    </div>
  );
}
