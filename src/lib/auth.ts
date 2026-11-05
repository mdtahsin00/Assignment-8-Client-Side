import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const g = globalThis as unknown as { _mongo?: MongoClient };
const client = g._mongo ?? new MongoClient(process.env.MONGODB_URI as string);
if (process.env.NODE_ENV !== "production") g._mongo = client;
const db = client.db(process.env.DB_NAME || "studiospace");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false }, // register -> login page
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID as string, clientSecret: process.env.GOOGLE_CLIENT_SECRET as string },
  },
  plugins: [nextCookies()],
});
