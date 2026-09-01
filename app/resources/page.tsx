import type { Metadata } from "next";
import { ResourcesSection } from "../../components/resources-section";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Interactive data portals and open-source software from the Garber Lab, including the Skin Omics Explorer, the vitiligo single-cell portal, and slncky.",
};

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesSection />
    </main>
  );
}
