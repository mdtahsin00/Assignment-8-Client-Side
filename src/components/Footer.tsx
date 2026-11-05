"use client";
import Link from "next/link";
import { Aperture, Instagram, Linkedin, Youtube } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/constants";

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-card">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-head text-2xl font-extrabold tracking-tight"><Aperture className="h-7 w-7 text-accent" />StudioSpace</Link>
          <p className="mt-3 max-w-xs text-sm text-mute">Our mission is simple: put every creator in the right room, at the right hour, at a fair price.</p>
          <div className="mt-4 flex gap-3 text-mute">
            <a href="https://x.com" aria-label="X" className="hover:text-accent"><XLogo /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-accent"><Instagram className="h-5 w-5" /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="hover:text-accent"><Youtube className="h-5 w-5" /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-accent"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold">Quick links</h3>
          <ul className="space-y-2 text-sm text-mute">
            {[["/", "Home"], ["/studios", "Explore Studios"], ["/how-it-works", "How It Works"], ["/about", "About Us"], ["/add-studio", "Host Your Space"]].map(([h, l]) => <li key={h}><Link href={h} className="hover:text-accent">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold">Popular categories</h3>
          <ul className="space-y-2 text-sm text-mute">
            {CATEGORIES.map((c) => <li key={c.name}><Link href={`/studios?category=${encodeURIComponent(c.name)}`} className="hover:text-accent">{c.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold">New spaces, weekly</h3>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); toast.success("You're on the list. Watch your inbox."); (e.target as HTMLFormElement).reset(); }}>
            <input required type="email" placeholder="you@email.com" className="input" aria-label="Email" />
            <button className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-mute">
        © {new Date().getFullYear()} StudioSpace. All rights reserved. Use of this site means you accept our Terms and Privacy Notice.
      </div>
    </footer>
  );
}
