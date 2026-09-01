"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { isFirebaseClientConfigured, publicEnv } from "@/lib/public-env";

export function getFirebaseClientApp() {
  if (!isFirebaseClientConfigured()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    apiKey: publicEnv.firebase.apiKey,
    authDomain: publicEnv.firebase.authDomain,
    projectId: publicEnv.firebase.projectId,
    storageBucket: publicEnv.firebase.storageBucket,
    messagingSenderId: publicEnv.firebase.messagingSenderId,
    appId: publicEnv.firebase.appId,
  });
}

export function getFirebaseClientAuth() {
  const app = getFirebaseClientApp();
  return app ? getAuth(app) : null;
}

export const googleProvider = new GoogleAuthProvider();
