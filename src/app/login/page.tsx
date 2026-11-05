"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "@/components/GoogleButton";

export default function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({ email: String(f.get("email")), password: String(f.get("password")) });
    setBusy(false);
    if (error) { const m = error.message || "Wrong email or password."; setErr(m); toast.error(m); return; }
    toast.success("Welcome back!");
    router.push(new URLSearchParams(window.location.search).get("next") || "/");
  }
  return (
    <div className="wrap flex min-h-[75vh] items-center justify-center py-10">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold">Log in</h1>
        <p className="mb-6 mt-1 text-sm text-mute">Pick up where you left off.</p>
        <form onSubmit={submit} className="space-y-4">
          <input name="email" type="email" required placeholder="Email" className="input" aria-label="Email" />
          <input name="password" type="password" required placeholder="Password" className="input" aria-label="Password" />
          {err && <p className="text-sm text-red-500">{err}</p>}
          <button type="button" onClick={() => toast.info("Password reset isn't available yet. Contact support to recover your account.")} className="cursor-pointer text-sm text-accent">Forgot password?</button>
          <button disabled={busy} className="btn btn-primary w-full">{busy ? "Logging in..." : "Log in"}</button>
        </form>
        <div className="my-5 text-center text-xs text-mute">or</div>
        <GoogleButton label="Continue with Google" />
        <p className="mt-6 text-center text-sm text-mute">New here? <Link href="/register" className="font-semibold text-accent">Create an account</Link></p>
      </div>
    </div>
  );
}
