"use client";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ label }: { label: string }) {
  const go = async () => {
    const next = new URLSearchParams(window.location.search).get("next") || "/";
    const r = await authClient.signIn.social({ provider: "google", callbackURL: next });
    if (r?.error) toast.error(r.error.message || "Google sign-in failed.");
  };
  return <button type="button" onClick={go} className="btn btn-ghost w-full">{label}</button>;
}
