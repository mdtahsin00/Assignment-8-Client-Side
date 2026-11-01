"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { redirect } from "next/navigation";

const GoogleIcon = () => (
  <svg className="size-4" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.3 5.3C36.9 40.2 44 35 44 24c0-1.3-.1-2.3-.4-3.5z"
    />
  </svg>
);

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  
  const onSubmit = async(e: React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {name:string, email:string, password:string};

    const { data, error } = await authClient.signUp.email({
        ...user, // User image URL (optional)
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    });

    if(data){
      redirect("/")
    } 

  }


  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 pl-4 pr-12 text-sm text-white placeholder-white/30 outline-none transition focus:border-amber-400/60 focus:bg-white/[0.06]";

  return (
    <main className="flex flex-1 justify-center bg-[#0b0b0c] px-5 py-14 sm:px-8">
      <div className="w-full max-w-xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Start booking certified soundstages or list your creative space.
        </p>

      <form onSubmit={onSubmit}>

        {/* Full Name */}
        <div className="mt-7">
          <label
            htmlFor="name"
            className="mb-2 block text-xs text-neutral-400"
          >
            Full Name or Production Company
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              className={inputClass}
            />
          
          </div>


        </div>

        {/* Email */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="email" className="text-xs text-neutral-400">
              Professional Email Address
            </label>
            
          </div>
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className={inputClass}
            />
            
          </div>
        </div>



        {/* Password */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-xs text-neutral-400">
              Master Password
            </label>
            <span className="text-[11px] font-medium text-amber-400">
              Requirement Pending
            </span>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-white"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-7 w-full rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-black transition hover:bg-amber-300"
        >
          Create Production Account →
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-semibold tracking-[0.18em] text-neutral-500">
            OR CONTINUE WITH
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.07]"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        </form>

        {/* Footer links */}
        <p className="mt-8 text-center text-xs text-neutral-400">
          Already have an account?{" "}
          <Link href="/signIn" className="font-semibold text-white underline">
            Log In
          </Link>
        </p>
        <p className="mt-3 text-center text-[11px] text-neutral-500">
          Free to join • Zero setup fees • Cancel anytime
        </p>
      </div>
    </main>
  );
}
