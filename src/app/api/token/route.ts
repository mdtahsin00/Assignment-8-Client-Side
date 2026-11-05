import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Turns a valid Better Auth session into a JWT stored in an HTTPOnly cookie for the Express API.
export async function POST() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "JWT_SECRET is not configured on the server (set it in your host's environment variables)." },
      { status: 500 },
    );
  }

  const { email, name, image } = session.user;
  const token = jwt.sign({ email, name, image }, secret, { expiresIn: "7d" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("ss_token", token, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("ss_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
