import type { Metadata } from "next";
import { CurrentStorySection } from "../../components/current-story-section";
import { FundingSection } from "../../components/funding-section";
import { ResearchHero } from "../../components/research-hero";
import { ResearchSection } from "../../components/research-section";

export const metadata: Metadata = {
  title: "Research",
  description:
    "How the Garber Lab studies autoimmunity and autoinflammatory skin disease through genetics, cytokine response, and spatial genomics.",
};

export default function ResearchPage() {
  return (
    <main>
      <ResearchHero />
      <ResearchSection />
      <CurrentStorySection />
      <FundingSection />
    </main>
  );
}
