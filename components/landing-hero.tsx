import Link from "next/link";
import { researchPrograms } from "../data/homepage";
import { getPublicationCount } from "../lib/publications";

export function LandingHero() {
  const publicationCount = getPublicationCount();

  return (
    <section className="section-shell landing-hero">
      <div className="landing-hero-copy">
        <p className="kicker">Systems immunology of human autoimmunity</p>
        <h1>From reductionist mechanisms to models of autoimmunity in humans</h1>
        <p className="lede">
          We combine human skin cohorts, spatial and single-cell genomics, perturbation, and
          regulatory modeling to understand the stromal, mesenchymal, and immune-cell interactions
          that drive autoimmune reactions.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <Link className="button button-primary" href="/research">
            Explore research
          </Link>
          <Link className="button button-secondary" href="/join">
            Work with us
          </Link>
        </div>
      </div>
      <div className="landing-hero-stats" aria-label="Lab at a glance">
        <div className="stat">
          <strong>2009</strong>
          <span>Lab founded</span>
        </div>
        <div className="stat">
          <strong>{researchPrograms.length}</strong>
          <span>Active research programs</span>
        </div>
        <div className="stat">
          <strong>{publicationCount}</strong>
          <span>Selected publications</span>
        </div>
      </div>
    </section>
  );
}
