import type { Metadata } from "next";
import { PeopleSection } from "../../components/people-section";

export const metadata: Metadata = {
  title: "People",
  description: "The Garber Lab team: current members, alumni, and collaborators.",
};

export default function PeoplePage() {
  return (
    <main>
      <PeopleSection />
    </main>
  );
}
