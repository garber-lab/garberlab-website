import type { Metadata } from "next";
import { CoreSection } from "../../components/core-section";

export const metadata: Metadata = {
  title: "Bioinformatics Core",
  description:
    "The story of the UMass Chan Bioinformatics Core, founded by Manuel Garber in 2011: Dolphin, DEBrowser, DolphinNext, Via Scientific, and its AI-focused reinvention.",
};

export default function CorePage() {
  return (
    <main>
      <CoreSection />
    </main>
  );
}
