import type { MetadataRoute } from "next";
import { commentaryItems } from "../data/commentary";
import { navigationLinks } from "../data/navigation";
import { newsItems } from "../data/news";
import { siteUrl } from "../data/site";

export const dynamic = "force-static";

const priorities: Record<string, number> = {
  "/": 1,
  "/research": 0.8,
  "/publications": 0.8,
  "/people": 0.8,
};

function newest(dates: string[]): Date | undefined {
  const sorted = dates.filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort();
  return sorted.length ? new Date(`${sorted[sorted.length - 1]}T00:00:00Z`) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestNews = newest(newsItems.map((item) => item.date));
  const latestCommentary = newest(commentaryItems.map((item) => item.date));

  const lastModified: Record<string, Date | undefined> = {
    "/": latestNews,
    "/news": latestNews,
    "/commentary": latestCommentary,
  };

  // No trailing slashes: the site redirects "/people/" to "/people".
  const paths = ["/", ...navigationLinks.map((link) => link.href)];

  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    // Only pages with dated content get lastmod; a build timestamp would change on every deploy.
    ...(lastModified[path] ? { lastModified: lastModified[path] } : {}),
    changeFrequency: path === "/news" || path === "/commentary" ? "weekly" : "monthly",
    priority: priorities[path] ?? 0.5,
  }));
}
