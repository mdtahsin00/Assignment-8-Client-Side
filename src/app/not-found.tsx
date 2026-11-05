import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <svg viewBox="0 0 220 160" className="w-64" aria-hidden>
        <rect x="20" y="70" width="180" height="70" rx="8" fill="var(--card)" stroke="var(--line)" strokeWidth="3" />
        <path d="M20 70 L40 40 H200 L180 70Z" fill="var(--accent)" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M${50 + i * 40} 40 l-14 30 h14 l14-30z`} fill="var(--card)" opacity=".85" />)}
        <circle cx="110" cy="108" r="18" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <path d="M100 98 l20 20 M120 98 l-20 20" stroke="var(--ink)" strokeWidth="3" />
      </svg>
      <h1 className="text-5xl font-extrabold">Cut! This page isn&apos;t on set.</h1>
      <p className="max-w-md text-mute">The link may be old or mistyped. Head back and find a studio that is ready for your shoot.</p>
      <Link href="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
}
