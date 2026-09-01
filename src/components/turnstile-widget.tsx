"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import { publicEnv } from "@/lib/public-env";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void },
      ) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
};

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!publicEnv.turnstileSiteKey || !ref.current || !window.turnstile) {
      return;
    }

    window.turnstile.render(ref.current, {
      sitekey: publicEnv.turnstileSiteKey,
      callback: onToken,
    });
  }, [onToken]);

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
        strategy="lazyOnload"
      />
      <div ref={ref} className="min-h-16" />
    </>
  );
}
