"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { publicEnv } from "@/lib/public-env";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
          action: string;
          theme: "light";
          size: "flexible";
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
};

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (
      !publicEnv.turnstileSiteKey ||
      !ref.current ||
      !scriptReady ||
      !window.turnstile
    ) {
      return;
    }

    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: publicEnv.turnstileSiteKey,
      callback: onToken,
      "error-callback": () => onToken(""),
      "expired-callback": () => onToken(""),
      action: "early_access",
      theme: "light",
      size: "flexible",
    });

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [onToken, scriptReady]);

  if (!publicEnv.turnstileSiteKey) {
    return (
      <p className="text-sm text-synq-ink/72">
        Turnstile is not configured locally. For production, add Turnstile keys
        to protect public submissions.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={ref} className="min-h-16" aria-live="polite" />
    </>
  );
}
