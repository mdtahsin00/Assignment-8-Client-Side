"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Aperture, Menu, Moon, Sun, X as Close } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useAuth } from "@/app/providers";
import { authClient } from "@/lib/auth-client";

const links = [["/", "Home"], ["/studios", "Explore Studios"], ["/how-it-works", "How It Works"], ["/about", "About Us"]];
const menu = [["/dashboard", "Dashboard"], ["/add-studio", "Add New Studio"], ["/my-listings", "My Studio Listings"], ["/my-bookings", "My Bookings"]];

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  async function logout() {
    await authClient.signOut();
    await fetch("/api/token", { method: "DELETE" });
    toast.success("You're logged out.");
    router.push("/");
  }
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const lk = (h: string) => `border-b-2 py-1 text-sm font-semibold transition ${active(h) ? "border-accent text-accent" : "border-transparent text-mute hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-head text-2xl font-extrabold tracking-tight">
          <Aperture className="h-7 w-7 text-accent" />StudioSpace
        </Link>
        <nav className="hidden items-center gap-7 md:flex">{links.map(([h, l]) => <Link key={h} href={h} className={lk(h)}>{l}</Link>)}</nav>
        <div className="flex items-center gap-3">
          <button aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="btn btn-ghost !p-2.5">
            <Sun className="hidden h-4 w-4 dark:block" /><Moon className="h-4 w-4 dark:hidden" />
          </button>
          {user ? (
            <div className="group relative">
              <button aria-label="Account menu" className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-accent bg-card font-bold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {user.image ? <img src={user.image} alt={user.name} className="h-full w-full object-cover" /> : user.name[0]?.toUpperCase()}
              </button>
              <div className="invisible absolute right-0 top-full w-60 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="card p-2 shadow-xl">
                  <p className="truncate px-3 py-2 text-sm font-bold">{user.name}</p>
                  {menu.map(([h, l]) => <Link key={h} href={h} className="block rounded-md px-3 py-2 text-sm hover:bg-bg">{l}</Link>)}
                  <button onClick={logout} className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-red-500 hover:bg-bg">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn btn-ghost">Login</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
          <button aria-label="Menu" className="cursor-pointer md:hidden" onClick={() => setOpen(!open)}>{open ? <Close /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="wrap flex flex-col gap-3 border-t border-line pb-4 pt-3 md:hidden" onClick={() => setOpen(false)}>
          {links.map(([h, l]) => <Link key={h} href={h} className={lk(h)}>{l}</Link>)}
          {!user && <div className="flex gap-2"><Link href="/login" className="btn btn-ghost flex-1">Login</Link><Link href="/register" className="btn btn-primary flex-1">Register</Link></div>}
        </nav>
      )}
    </header>
  );
}
