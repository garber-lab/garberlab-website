import type { Metadata } from "next";
import { ApproachSection } from "../../components/approach-section";
import { CurrentStorySection } from "../../components/current-story-section";
import { FigureHighlightsSection } from "../../components/figure-highlights-section";
import { ResearchSection } from "../../components/research-section";

export const metadata: Metadata = {
  title: "Research",
  description:
    "How the Garber Lab studies regulatory programs, myeloid cell states, and tissue circuits in human inflammatory skin disease.",
};

export default function ResearchPage() {
  return (
    <main>
      <ResearchSection />
      <FigureHighlightsSection />
      <ApproachSection />
      <CurrentStorySection />
    </main>
  );
}
