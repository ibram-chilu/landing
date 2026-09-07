import posthog from "posthog-js";

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string> },
    ) => void;
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string>,
    ) => void;
  }
}

export const analyticsEvents = {
  watchDemoClicked: "watch_demo_clicked",
  videoStarted: "video_started",
  earlyAccessStarted: "early_access_started",
  earlyAccessCompleted: "early_access_signup_completed",
  adminSignInCompleted: "admin_sign_in_completed",
  adminSignupStatusUpdated: "admin_signup_status_updated",
  adminSignupExportRequested: "admin_signup_export_requested",
} as const;

export function identifyPostHogUser(
  userId: string,
  properties: Record<string, string | undefined>,
) {
  if (isPostHogConfigured) {
    posthog.identify(userId, properties);
  }
}

export function resetPostHog() {
  if (isPostHogConfigured) {
    posthog.reset();
  }
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  if (isPostHogConfigured) {
    posthog.capture(eventName, params);
  }
  window.plausible?.(eventName, { props: params });
  window.gtag?.("event", eventName, params);
}
