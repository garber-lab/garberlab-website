import { researchPrograms } from "../data/homepage";
import { getPublicationCount } from "../lib/publications";

export function LandingStats() {
  const publicationCount = getPublicationCount();

  return (
    <section className="section-shell landing-stats" aria-label="Lab at a glance">
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
    </section>
  );
}
