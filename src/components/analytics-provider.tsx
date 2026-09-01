"use client";

import Script from "next/script";

import { publicEnv } from "@/lib/public-env";

export function AnalyticsProvider() {
  if (!publicEnv.analyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="synq-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${publicEnv.analyticsId}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
