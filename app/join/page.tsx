import type { Metadata } from "next";
import { JoinSection } from "../../components/join-section";

export const metadata: Metadata = {
  title: "Join",
  description: "Join the Garber Lab: postdoc, graduate student, and collaborator opportunities.",
};

export default function JoinPage() {
  return (
    <main>
      <JoinSection />
    </main>
  );
}
