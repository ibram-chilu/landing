import { NextResponse } from "next/server";

import { submitEarlyAccessSignup } from "@/lib/signup-service";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const turnstileValid = await verifyTurnstileToken(body.turnstileToken);

    if (!turnstileValid) {
      return NextResponse.json(
        { ok: false, message: "Please complete the verification challenge." },
        { status: 400 },
      );
    }

    const result = await submitEarlyAccessSignup(body);

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      duplicate: result.duplicate,
      message: result.duplicate
        ? "That email is already on the early-access list."
        : "Signup received successfully.",
    });
  } catch (error) {
    // Keep the public response generic, but retain enough detail in server logs to diagnose Firebase failures.
    console.error("Early-access signup failed", error);
    return NextResponse.json(
      {
        ok: false,
        message: "We couldn't process your signup just now. Please try again.",
      },
      { status: 500 },
    );
  }
}
