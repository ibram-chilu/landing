"use client";

import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { getFirebaseClientAuth, googleProvider } from "@/lib/firebase-client";
import { isFirebaseClientConfigured } from "@/lib/public-env";

export function AdminAuthPanel({
  reason,
}: {
  reason: "auth" | "setup" | "forbidden";
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    const auth = getFirebaseClientAuth();
    if (!auth) {
      setError(
        "Firebase client configuration is missing. Add the public Firebase variables first.",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: token }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Could not create admin session.");
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  const heading =
    reason === "setup"
      ? "Admin setup required"
      : reason === "forbidden"
        ? "Access not allowed"
        : "Sign in to view signups";

  const body =
    reason === "setup"
      ? "Add Firebase client keys, Firebase Admin credentials and `ADMIN_EMAILS` before the protected dashboard can verify an administrator."
      : reason === "forbidden"
        ? "This Google account is not on the allowed admin email list."
        : "Use Google sign-in. The server verifies the Firebase ID token and only allows listed admin emails.";

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-synq-navy/10 bg-white p-8 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-synq-teal">
        Protected route
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-synq-navy">
        {heading}
      </h1>
      <p className="mt-4 text-sm leading-7 text-synq-ink/78">{body}</p>
      {!isFirebaseClientConfigured() ? (
        <p className="mt-5 rounded-2xl bg-synq-mint px-4 py-3 text-sm text-synq-teal">
          Public Firebase variables are not configured yet, so Google sign-in
          cannot start.
        </p>
      ) : null}
      {error ? (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={loading || !isFirebaseClientConfigured()}
        onClick={() => void signIn()}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-synq-navy px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}
