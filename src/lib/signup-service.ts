import { FieldValue } from "firebase-admin/firestore";

import { getAdminFirestore } from "@/lib/firebase-admin";
import { getSignupId, normalizeEmail, SIGNUP_COLLECTION } from "@/lib/signup";
import { signupSchema, type SignupInput } from "@/lib/validation";

export type SignupSubmissionResult =
  | { ok: true; duplicate: false; id: string }
  | { ok: true; duplicate: true; id: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function submitEarlyAccessSignup(
  input: SignupInput,
): Promise<SignupSubmissionResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;
  if (data.website) {
    return { ok: false, message: "Submission could not be accepted." };
  }

  const db = getAdminFirestore();
  if (!db) {
    return { ok: false, message: "Firebase Admin is not configured yet." };
  }

  const normalizedEmail = normalizeEmail(data.email);
  const signupId = getSignupId(normalizedEmail);
  const docRef = db.collection(SIGNUP_COLLECTION).doc(signupId);
  const existing = await docRef.get();

  if (existing.exists) {
    return { ok: true, duplicate: true, id: signupId };
  }

  await docRef.set({
    firstName: data.firstName,
    email: normalizedEmail,
    whatsappNumber: data.whatsappNumber || null,
    primaryUseCase: data.primaryUseCase,
    typicalGroupSize: data.typicalGroupSize || null,
    biggestChallenge: data.biggestChallenge || null,
    consent: data.consent,
    createdAt: FieldValue.serverTimestamp(),
    sourcePage: data.sourcePage,
    referrer: data.referrer || null,
    utmSource: data.utmSource || null,
    utmMedium: data.utmMedium || null,
    utmCampaign: data.utmCampaign || null,
    signupStatus: "new",
    searchName: data.firstName.toLowerCase(),
    searchEmail: normalizedEmail,
  });

  return { ok: true, duplicate: false, id: signupId };
}
