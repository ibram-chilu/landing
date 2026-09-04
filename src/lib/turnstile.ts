import {
  isTurnstileConfigured,
  isTurnstileUnconfigured,
  serverEnv,
} from "@/lib/server-env";

export async function verifyTurnstileToken(token?: string | null) {
  if (!isTurnstileConfigured()) {
    // Local development can run without Turnstile. Production must never silently disable it.
    return process.env.NODE_ENV !== "production" && isTurnstileUnconfigured();
  }

  if (!token) {
    return false;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: serverEnv.turnstileSecretKey!,
        response: token,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success?: boolean;
    action?: string;
  };
  return Boolean(result.success && result.action === "early_access");
}
