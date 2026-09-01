import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteContent } from "@/content/site";
import { AnalyticsProvider } from "@/components/analytics-provider";

import "./globals.css";

const siteUrl = siteContent.canonicalUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteContent.title,
  description: siteContent.description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteContent.title,
    description: siteContent.description,
    url: siteUrl,
    siteName: siteContent.siteName,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Synq early access preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.title,
    description: siteContent.description,
    images: [`${siteUrl}/twitter-image`],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
