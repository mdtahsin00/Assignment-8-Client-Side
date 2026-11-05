import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Turns a valid Better Auth session into a JWT stored in an HTTPOnly cookie for the Express API.
export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { email, name, image } = session.user;
  const token = jwt.sign({ email, name, image }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
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
