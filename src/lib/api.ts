// Calls the Express API through the Next.js proxy so the HTTPOnly cookie is sent automatically.
export async function api<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/server-api${path}`, {
    credentials: "include",
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data as T;
}
