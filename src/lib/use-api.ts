"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export function useApi<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!path);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    if (!path) return;
    setLoading(true);
    setError("");
    try { setData(await api<T>(path)); } catch (e: any) { setError(e.message); } finally { setLoading(false); }
  }, [path]);
  useEffect(() => { load(); }, [load]);
  return { data, loading, error, reload: load, setData };
}
