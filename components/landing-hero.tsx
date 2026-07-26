import Link from "next/link";

export function LandingHero() {
  return (
    <section className="hero-media">
      <img
        className="hero-media-image"
        src="/assets/hero-tissue.webp"
        alt="Spatial transcriptomics of human skin showing MMP9+ myeloid cells and LYVE1+ populations at the epidermal-dermal boundary"
      />
      <div className="hero-media-overlay" aria-hidden="true" />
      <div className="hero-media-content section-shell">
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
      <p className="hero-media-credit">
        Spatial transcriptomics of human skin — MMP9+ myeloid cells and LYVE1+ populations at the
        epidermal-dermal boundary
      </p>
    </section>
  );
}
