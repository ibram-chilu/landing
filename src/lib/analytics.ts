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
} as const;

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  window.plausible?.(eventName, { props: params });
  window.gtag?.("event", eventName, params);
}
