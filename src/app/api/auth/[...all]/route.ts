import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Resolve the auth instance lazily so the build doesn't require runtime env vars.
const handler = () => toNextJsHandler(getAuth());

export async function GET(request: Request) {
  return handler().GET(request);
}

export async function POST(request: Request) {
  return handler().POST(request);
}
