import { LandingCta } from "../components/landing-cta";
import { LandingFeaturedPaper } from "../components/landing-featured-paper";
import { LandingHero } from "../components/landing-hero";
import { LandingProgramsPreview } from "../components/landing-programs-preview";
import { LandingStats } from "../components/landing-stats";

export default function Home() {
  return (
    <main>
      <LandingHero />
      <LandingStats />
      <LandingProgramsPreview />
      <LandingFeaturedPaper />
      <LandingCta />
    </main>
  );
}
