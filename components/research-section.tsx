import { researchPrograms } from "../data/homepage";

export function ResearchSection() {
  return (
    <>
      <section className="section-shell statement">
        <p>
          This current focus builds directly from the lab&apos;s earlier work in comparative genomics, 
          gene regulation, and computational method development. 
          Those tools let us compare diseases at their most elemental features and connect basic regulatory principles 
          to complex clinical phenotypes. Our goal is to build systems immunology models that explain how molecular 
          programs become coordinated cellular behaviors in human tissue.
        </p>
      </section>

      <section className="section-shell split-feature" id="research">
        <div>
          <p className="kicker">Research focus</p>
          <h2>Skin as a human model of autoimmunity and autoinflammatory conditions</h2>
        </div>
        <div className="split-feature-copy">
          <p>
            Inflammatory skin disease gives us access to the molecular, spatial, and clinical layers of
            autoimmunity. We use that access to connect cell state, tissue context, environmental
            exposure, and genetic variation.
          </p>
          <p>
            Sample collection is minimally invasive: blister or punch biopsies and tape stripping are
            quick, low-risk procedures, and a growing set of assays can work from their small sample
            sizes. That combination makes skin a uniquely tractable system for studying autoimmunity
            directly in humans.
          </p>
        </div>
      </section>

      <section className="program-grid section-shell" aria-label="Research programs">
        {researchPrograms.map((program) => (
          <article className="program-card" key={program.title}>
            {program.image ? (
              <div className="program-card-image">
                <img src={program.image} alt={program.imageAlt ?? ""} />
              </div>
            ) : null}
            <p>{program.eyebrow}</p>
            <h3>{program.title}</h3>
            <span>{program.text}</span>
            {program.link ? (
              <a className="program-card-link" href={program.link}>
                {program.linkLabel ?? program.link}
              </a>
            ) : null}
          </article>
        ))}
      </section>
    </>
  );
}
