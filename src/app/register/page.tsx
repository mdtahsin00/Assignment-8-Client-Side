"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "@/components/GoogleButton";

export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [pwErr, setPwErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));
    const problem = !/[A-Z]/.test(password) ? "Password needs an uppercase letter." : !/[a-z]/.test(password) ? "Password needs a lowercase letter." : password.length < 6 ? "Password must be at least 6 characters." : "";
    setPwErr(problem);
    if (problem) { toast.error(problem); return; }
    setBusy(true);
  const { error } = await authClient.signUp.email({
      name: String(f.get("name")), email: String(f.get("email")), password: String(f.get("email")), image: String(f.get("photo") || "") || undefined,
    });
    setBusy(false);
    if (error) { toast.error(error.message || "Couldn't create your account."); return; }
    toast.success("Account created. Log in to continue.");
    router.push("/login");
  }
  return (
    <div className="wrap flex min-h-[75vh] items-center justify-center py-10">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold">Create your account</h1>
        <p className="mb-6 mt-1 text-sm text-mute">Book studios or list your own.</p>
        <form onSubmit={submit} className="space-y-4">
          <input name="name" required placeholder="Full name" className="input" aria-label="Name" />
          <input name="email" type="email" required placeholder="Email" className="input" aria-label="Email" />
          <input name="photo" type="url" placeholder="Photo URL (optional)" className="input" aria-label="Photo URL" />
          <div>
            <input name="password" type="password" required placeholder="Password" className="input" aria-label="Password" />
            {pwErr ? <p className="mt-1 text-sm text-red-500">{pwErr}</p> : <p className="mt-1 text-xs text-mute">6+ characters with an uppercase and a lowercase letter.</p>}
          </div>
          <button disabled={busy} className="btn btn-primary w-full">{busy ? "Creating..." : "Register"}</button>
        </form>
        <div className="my-5 text-center text-xs text-mute">or</div>
        <GoogleButton label="Sign up with Google" />
        <p className="mt-6 text-center text-sm text-mute">Already registered? <Link href="/login" className="font-semibold text-accent">Log in</Link></p>
      </div>
    </div>
  );
}
