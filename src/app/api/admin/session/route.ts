import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { getAdminAuth } from "@/lib/firebase-admin";
import { serverEnv } from "@/lib/server-env";

export async function POST(request: Request) {
  try {
    const { idToken } = (await request.json()) as { idToken?: string };
    if (!idToken) {
      return NextResponse.json(
        { message: "Missing Firebase ID token." },
        { status: 400 },
      );
    }

    const auth = getAdminAuth();
    if (!auth) {
      return NextResponse.json(
        { message: "Firebase Admin is not configured yet." },
        { status: 503 },
      );
    }

    const decoded = await auth.verifyIdToken(idToken);
    const email = decoded.email?.toLowerCase();

    if (
      !decoded.email_verified ||
      !email ||
      !serverEnv.adminEmails.includes(email)
    ) {
      return NextResponse.json(
        {
          message: "This account is not allowed to access the admin dashboard.",
        },
        { status: 403 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 6,
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: "Could not verify the Firebase ID token." },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
