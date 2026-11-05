"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";

type U = { id: string; name: string; email: string; image?: string | null };
const AuthCtx = createContext<{ user: U | null; ready: boolean }>({ user: null, ready: false });
export const useAuth = () => useContext(AuthCtx);

function AuthSync({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [ready, setReady] = useState(false);
  const uid = session?.user?.id;
  useEffect(() => {
    if (isPending) return;
    if (!uid) { setReady(true); return; }
    // Mint the HTTPOnly JWT cookie for the Express API before private pages fetch anything.
    setReady(false);
    fetch("/api/token", { method: "POST" }).finally(() => setReady(true));
  }, [isPending, uid]);
  return <AuthCtx.Provider value={{ user: (session?.user as U) ?? null, ready }}>{children}</AuthCtx.Provider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthSync>{children}</AuthSync>
      <Toaster richColors position="top-right" closeButton />
    </ThemeProvider>
  );
}
