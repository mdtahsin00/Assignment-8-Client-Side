import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

type Auth = ReturnType<typeof createAuth>;

// Cache on globalThis so dev HMR and warm serverless invocations reuse one
// Mongo client instead of opening a connection per request.
const g = globalThis as unknown as { _mongo?: MongoClient; _auth?: Auth };

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env.local locally and in the Vercel project's ` +
        `Environment Variables for deployments (then redeploy).`,
    );
  }
  return value;
}

function getClient() {
  if (!g._mongo) g._mongo = new MongoClient(required("MONGODB_URI"));
  return g._mongo;
}

function createAuth() {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || undefined,
    secret: required("BETTER_AUTH_SECRET"),
    database: mongodbAdapter(getClient().db(process.env.DB_NAME || "StudioSpace")),
    // Vercel preview deployments get their own domain; trusting VERCEL_URL keeps
    // Google/email auth working there without extra config.
    trustedOrigins: [process.env.BETTER_AUTH_URL, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`].filter(
      (origin): origin is string => Boolean(origin),
    ),
    emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false }, // register -> login page
    socialProviders: {
      google: {
        clientId: required("GOOGLE_CLIENT_ID"),
        clientSecret: required("GOOGLE_CLIENT_SECRET"),
      },
    },
    plugins: [nextCookies()],
  });
}

// Built on first request, not at import time, so `next build` (and Vercel's
// build step) never needs runtime secrets — only requests do.
export function getAuth(): Auth {
  if (!g._auth) g._auth = createAuth();
  return g._auth;
}
