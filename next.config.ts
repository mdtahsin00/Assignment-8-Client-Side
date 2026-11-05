import type { NextConfig } from "next";

// All browser calls go to /server-api/*, which Next proxies to the Express server.
// That keeps the HTTPOnly JWT cookie same-origin, so it is sent automatically.
//
// API_URL is read during `next build` (rewrites are baked into the build), so it
// must be set in the hosting provider's build environment before deploying.
const apiUrl = (process.env.API_URL || "").replace(/\/+$/, "");

if (!apiUrl && process.env.VERCEL) {
  console.warn(
    "[studiospace] API_URL is not set. /server-api/* will proxy to http://localhost:5000, " +
      "which is unreachable on Vercel. Set API_URL to the deployed Express server URL and redeploy.",
  );
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/server-api/:path*", destination: `${apiUrl || "http://localhost:5000"}/api/:path*` }];
  },
};

export default nextConfig;
