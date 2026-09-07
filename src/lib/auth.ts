import { cookies } from "next/headers";

import { getAdminAuth } from "@/lib/firebase-admin";

export const ADMIN_SESSION_COOKIE = "synq_admin_token";

export type AdminUser = {
  id: string;
  email: string;
  name?: string;
};

export async function getVerifiedAdminSession(allowlist: string[]) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const auth = getAdminAuth();
  if (!auth) {
    return null;
  }

  const decoded = await auth.verifyIdToken(token);
  const email = decoded.email?.toLowerCase();

  if (!decoded.email_verified || !email || !allowlist.includes(email)) {
    return null;
  }

  return {
    id: decoded.uid,
    email,
    name: decoded.name,
  } satisfies AdminUser;
}
