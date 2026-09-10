import type { Metadata } from "next";
import { CommentarySection } from "../../components/commentary-section";

export const metadata: Metadata = {
  title: "Commentary",
  description: "Manuel Garber's notes and reactions to papers and ideas, cross-posted from LinkedIn.",
};

export default function CommentaryPage() {
  return (
    <main>
      <CommentarySection />
    </main>
  );
}
