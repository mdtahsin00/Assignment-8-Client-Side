import type { NextConfig } from "next";

// All browser calls go to /server-api/*, which Next proxies to the Express server.
// That keeps the HTTPOnly JWT cookie same-origin, so it is sent automatically.
const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/server-api/:path*", destination: `${process.env.API_URL || "http://localhost:5000"}/api/:path*` }];
  },
};
export default nextConfig;
