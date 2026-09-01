import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { isFirebaseAdminConfigured, serverEnv } from "@/lib/server-env";

export function getFirebaseAdminApp() {
  if (!isFirebaseAdminConfigured()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  return initializeApp({
    credential: cert({
      projectId: serverEnv.firebaseAdmin.projectId,
      clientEmail: serverEnv.firebaseAdmin.clientEmail,
      privateKey: serverEnv.firebaseAdmin.privateKey,
    }),
    projectId: serverEnv.firebaseAdmin.projectId,
  });
}

export function getAdminAuth() {
  const app = getFirebaseAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminFirestore() {
  const app = getFirebaseAdminApp();
  return app ? getFirestore(app) : null;
}
