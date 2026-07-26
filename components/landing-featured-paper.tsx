import Link from "next/link";
import { getPublicationById } from "../lib/publications";

const FEATURED_DOI = "10.1038/s41590-026-02502-w";

export function LandingFeaturedPaper() {
  const paper = getPublicationById(FEATURED_DOI);
  if (!paper) return null;

  return (
    <section className="section-shell landing-paper" aria-label="Featured publication">
      <div className="landing-paper-cover">
        <img
          src="/nature-immunology-cover.jpg"
          alt="Nature Immunology Volume 27 Issue 6 cover for keratinocyte-fibroblast circuits in photosensitive autoimmunity"
        />
      </div>
      <div>
        <p className="kicker">Featured paper · {paper.journal}, {paper.year}</p>
        <h3>{paper.title}</h3>
        <p>{paper.authors}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={paper.url}>
            Read the paper
          </a>
          <Link className="button button-secondary" href="/publications">
            All publications
          </Link>
        </div>
      </div>
    </section>
  );
}
