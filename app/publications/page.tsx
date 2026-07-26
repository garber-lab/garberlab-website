import type { Metadata } from "next";
import { PublicationsSection } from "../../components/publications-section";
import { getSelectedPublications } from "../../lib/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Selected publications from the Garber Lab, grouped by research theme.",
};

export default function PublicationsPage() {
  const selectedPublications = getSelectedPublications();

  return (
    <main>
      <PublicationsSection selectedPublications={selectedPublications} />
    </main>
  );
}
