import { createHash } from "node:crypto";

export const SIGNUP_COLLECTION = "earlyAccessSignups";
export const signupStatuses = [
  "new",
  "contacted",
  "interviewed",
  "beta_invited",
] as const;
export type SignupStatus = (typeof signupStatuses)[number];

export function sanitizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeEmail(value: string) {
  return sanitizeText(value).toLowerCase();
}

export function getSignupId(normalizedEmail: string) {
  return createHash("sha256").update(normalizedEmail).digest("hex");
}

export function getAllowedOrigin(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path}`;
}
