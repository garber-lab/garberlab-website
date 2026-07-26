export function HeroSection() {
  return (
    <section className="hero section-shell">
      <div className="hero-copy">
        <p className="kicker">Systems immunology of human autoimmunity</p>
        <h1>From reductionist mechanisms to models of autoimmunity in humans</h1>
        <p className="lede">
          We combine human skin cohorts, spatial and single-cell genomics, perturbation, and
          regulatory modeling to understand the stromal, mesenchymal, and immune-cell interactions
          that drive autoimmune reactions.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#research">
            Explore research
          </a>
          <a className="button button-secondary" href="#join">
            Work with us
          </a>
        </div>
      </div>
      <div className="hero-visual hero-cover" aria-label="Nature Immunology cover, Volume 27 Issue 6">
        <img
          src="/nature-immunology-cover.jpg"
          alt="Nature Immunology Volume 27 Issue 6 cover for keratinocyte-fibroblast circuits in photosensitive autoimmunity"
        />
        <div className="cover-note">
          <span>Featured cover</span>
          <strong>Keratinocyte-fibroblast circuits in photosensitive autoimmunity</strong>
          <p>Image: Yuqing Wang, generated using Spatial Genomics. Cover design: Vanitha Selvarajan.</p>
        </div>
      </div>
    </section>
  );
}
