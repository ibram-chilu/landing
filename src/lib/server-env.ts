const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function normalizeFirebasePrivateKey(value?: string) {
  if (!value) {
    return undefined;
  }

  // Firebase downloads use escaped newlines, while some hosts provide real newlines.
  return value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");
}

export const serverEnv = {
  adminEmails,
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
  firebaseAdmin: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: normalizeFirebasePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
  },
};

export function isFirebaseAdminConfigured() {
  return Object.values(serverEnv.firebaseAdmin).every(Boolean);
}

export function isTurnstileConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && serverEnv.turnstileSecretKey,
  );
}
