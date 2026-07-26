import type { Metadata } from "next";
import { ApproachSection } from "../../components/approach-section";
import { CurrentStorySection } from "../../components/current-story-section";
import { FigureHighlightsSection } from "../../components/figure-highlights-section";
import { FundingSection } from "../../components/funding-section";
import { ResearchSection } from "../../components/research-section";

export const metadata: Metadata = {
  title: "Research",
  description:
    "How the Garber Lab studies autoimmunity and autoinflammatory skin disease through genetics, cytokine response, and spatial genomics.",
};

export default function ResearchPage() {
  return (
    <main>
      <ResearchSection />
      <FigureHighlightsSection />
      <ApproachSection />
      <CurrentStorySection />
      <FundingSection />
    </main>
  );
}
