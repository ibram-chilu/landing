import type { PrimaryUseCaseOption } from "@/content/site";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { escapeCsvValue } from "@/lib/utils";
import {
  SIGNUP_COLLECTION,
  signupStatuses,
  type SignupStatus,
} from "@/lib/signup";

export type SignupRecord = {
  id: string;
  firstName: string;
  email: string;
  whatsappNumber?: string | null;
  primaryUseCase: PrimaryUseCaseOption;
  typicalGroupSize?: string | null;
  biggestChallenge?: string | null;
  consent: boolean;
  signupStatus: SignupStatus;
  sourcePage: string;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  createdAt?: string | null;
};

export async function listSignups(filters: {
  search?: string;
  useCase?: string;
  status?: string;
}) {
  const db = getAdminFirestore();
  if (!db) {
    return {
      configured: false as const,
      total: 0,
      signups: [] as SignupRecord[],
    };
  }

  const snapshot = await db
    .collection(SIGNUP_COLLECTION)
    .orderBy("createdAt", "desc")
    .get();
  const searchTerm = (filters.search || "").trim().toLowerCase();
  const useCase = filters.useCase || "all";
  const status = filters.status || "all";

  const signups = snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName,
        email: data.email,
        whatsappNumber: data.whatsappNumber,
        primaryUseCase: data.primaryUseCase,
        typicalGroupSize: data.typicalGroupSize,
        biggestChallenge: data.biggestChallenge,
        consent: Boolean(data.consent),
        signupStatus: signupStatuses.includes(data.signupStatus)
          ? data.signupStatus
          : "new",
        sourcePage: data.sourcePage || "/",
        referrer: data.referrer,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null,
      } satisfies SignupRecord;
    })
    .filter((record) =>
      useCase === "all" ? true : record.primaryUseCase === useCase,
    )
    .filter((record) =>
      status === "all" ? true : record.signupStatus === status,
    )
    .filter((record) =>
      searchTerm
        ? `${record.firstName} ${record.email}`
            .toLowerCase()
            .includes(searchTerm)
        : true,
    );

  return { configured: true as const, total: signups.length, signups };
}

export async function updateSignupStatus(
  signupId: string,
  signupStatus: SignupStatus,
) {
  const db = getAdminFirestore();
  if (!db) {
    throw new Error("Firebase Admin is not configured yet.");
  }

  await db.collection(SIGNUP_COLLECTION).doc(signupId).update({ signupStatus });
}

export function signupsToCsv(records: SignupRecord[]) {
  const headers = [
    "firstName",
    "email",
    "whatsappNumber",
    "primaryUseCase",
    "typicalGroupSize",
    "biggestChallenge",
    "consent",
    "createdAt",
    "sourcePage",
    "referrer",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "signupStatus",
  ];

  const rows = records.map((record) =>
    [
      record.firstName,
      record.email,
      record.whatsappNumber,
      record.primaryUseCase,
      record.typicalGroupSize,
      record.biggestChallenge,
      record.consent,
      record.createdAt,
      record.sourcePage,
      record.referrer,
      record.utmSource,
      record.utmMedium,
      record.utmCampaign,
      record.signupStatus,
    ]
      .map(escapeCsvValue)
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
