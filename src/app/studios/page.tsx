"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StudioCard from "@/components/StudioCard";
import { SkeletonGrid } from "@/components/Skeleton";
import { useApi } from "@/lib/use-api";
import { CATEGORIES } from "@/lib/constants";
import type { Studio } from "@/lib/types";

export default function Explore() {
  const { data, loading, error } = useApi<Studio[]>("/studios");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("new");
  useEffect(() => { setCat(new URLSearchParams(window.location.search).get("category") || ""); }, []);

  const list = useMemo(() => {
    const t = q.toLowerCase();
    const r = (data || []).filter((s) => (!cat || s.category === cat) && (!t || `${s.title} ${s.location}`.toLowerCase().includes(t)));
    if (sort === "low") r.sort((a, b) => a.hourlyRate - b.hourlyRate);
    if (sort === "high") r.sort((a, b) => b.hourlyRate - a.hourlyRate);
    if (sort === "top") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [data, q, cat, sort]);

  return (
    <div className="wrap py-10">
      <h1 className="h2">Explore studios</h1>
      <p className="mb-6 mt-2 text-mute">Search by name or place, then narrow by category.</p>
      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_200px_200px]">
        <input className="input" placeholder="Search studios or locations" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        <select className="input" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
          <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="new">Newest</option><option value="top">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      {loading ? <SkeletonGrid /> : error ? <p className="card p-6 text-red-500">{error}</p> : list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => <StudioCard key={s._id} s={s} />)}</div>
      ) : (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <h3 className="text-xl font-bold">No studios match that search</h3>
          <p className="text-mute">Try a different keyword or clear the category filter.</p>
          <button className="btn btn-primary" onClick={() => { setQ(""); setCat(""); }}>Clear filters</button>
          <Link href="/add-studio" className="text-sm font-semibold text-accent">Or list your own space</Link>
        </div>
      )}
    </div>
  );
}
