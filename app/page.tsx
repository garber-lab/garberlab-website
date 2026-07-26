import { ApproachSection } from "../components/approach-section";
import { CurrentStorySection } from "../components/current-story-section";
import { FigureHighlightsSection } from "../components/figure-highlights-section";
import { HeroSection } from "../components/hero-section";
import { JoinSection } from "../components/join-section";
import { PeopleSection } from "../components/people-section";
import { PublicationsSection } from "../components/publications-section";
import { ResearchSection } from "../components/research-section";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getSelectedPublications } from "../lib/publications";

export default function Home() {
  const selectedPublications = getSelectedPublications();

  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ResearchSection />
      <FigureHighlightsSection />
      <ApproachSection />
      <CurrentStorySection />
      <PublicationsSection selectedPublications={selectedPublications} />
      <PeopleSection />
      <JoinSection />
      <SiteFooter />
    </main>
  );
}
