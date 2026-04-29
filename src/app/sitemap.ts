import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-data";

const SITE_URL = "https://automotor.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/garage`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/junkyards`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/junkyards/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/mechanics`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/mechanics/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/referrals`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const slugs = Object.keys(seoPages);
  const seoRoutes: MetadataRoute.Sitemap = slugs.flatMap((slug) => [
    { url: `${SITE_URL}/used-engine/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/used-engines/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/used-transmission/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ]);

  return [...staticRoutes, ...seoRoutes];
}
