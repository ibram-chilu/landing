const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const serverEnv = {
  adminEmails,
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
  firebaseAdmin: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
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
