import { LandingCta } from "../components/landing-cta";
import { LandingFeaturedPaper } from "../components/landing-featured-paper";
import { LandingHero } from "../components/landing-hero";
import { LandingProgramsPreview } from "../components/landing-programs-preview";

export default function Home() {
  return (
    <main>
      <LandingHero />
      <LandingProgramsPreview />
      <LandingFeaturedPaper />
      <LandingCta />
    </main>
  );
}
