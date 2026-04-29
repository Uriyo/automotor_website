import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/yards/", "/mechanics/dashboard", "/mechanics/quotes", "/mechanics/earnings", "/mechanics/referrals", "/mechanics/ai-tools", "/mechanics/requests", "/mechanics/customers", "/mechanics/settings", "/chat/"],
      },
    ],
    sitemap: "https://automotor.ai/sitemap.xml",
  };
}
