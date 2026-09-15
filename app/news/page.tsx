import type { Metadata } from "next";
import { NewsSection } from "../../components/news-section";

export const metadata: Metadata = {
  alternates: { canonical: "/news" },
  title: "News",
  description:
    "News from the Garber Lab: papers, new data resources, and lab member milestones.",
};

export default function NewsPage() {
  return (
    <main>
      <NewsSection />
    </main>
  );
}
