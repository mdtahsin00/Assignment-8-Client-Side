"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { Spinner } from "./Skeleton";

// Waits for the session to load first, so a reload on a private route never bounces a logged-in user to /login.
export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (ready && !user) router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [ready, user, router, path]);
  if (!ready || !user) return <Spinner label="Checking your session" />;
  return <>{children}</>;
}
