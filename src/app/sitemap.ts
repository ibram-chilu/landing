import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteContent.canonicalUrl.replace(/\/$/, "");

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${url}/admin/signups`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];
}
