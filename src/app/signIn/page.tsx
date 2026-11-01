"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15";

  return (
    <main className="flex flex-1 justify-center bg-[#fafafa] px-5 py-10 sm:px-8">
      <div className="w-full max-w-md">
        {/* Top link */}
        <p className="text-right text-xs text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/signUP" className="font-semibold text-orange-500">
            Sign up free
          </Link>
        </p>

        {/* Badge */}
        <div className="mt-8 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">
          <svg
            className="size-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          Secure Creator Portal
        </div>

        {/* Heading */}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          Log in to manage studio reservations, production call sheets, and host
          communications.
        </p>

        {/* Google */}
        <button
          type="button"
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white py-3.5 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">
            or continue with email
          </span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-800">
            Work or Creator Email
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input
              id="email"
              type="email"
              placeholder="director@studiospace.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-neutral-800">
              Password
            </label>
            <Link href="/#" className="text-xs font-semibold text-orange-500">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              defaultValue="supers3cretadmin"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-600"
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

        {/* Remember */}
        <label className="mt-5 flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded border-neutral-300 accent-orange-500"
          />
          <span className="text-xs text-neutral-600">
            Remember this device for 30 days
          </span>
        </label>

        {/* Submit */}
        <button
          type="button"
          className="mt-7 w-full rounded-lg bg-orange-500 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
        >
          Log in to StudioSpace →
        </button>
      </div>
    </main>
  );
}
