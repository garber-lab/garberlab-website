import { researchPrograms } from "../data/homepage";

export function ResearchSection() {
  return (
    <>
      <section className="section-shell statement">
        <p>
          The lab's earlier work in comparative genomics, noncoding regulation, and regulatory
          modeling is not separate from our current disease focus. It is the framework we use to ask
          a newer question: how do regulatory programs become cellular behaviors in human tissue?
        </p>
      </section>

      <section className="section-shell split-feature" id="research">
        <div>
          <p className="kicker">Research focus</p>
          <h2>Skin as a living model of regulatory immunology</h2>
        </div>
        <p>
          Inflammatory skin disease gives us access to the molecular, spatial, and clinical layers of
          autoimmunity. We use that access to connect cell state, tissue context, environmental
          exposure, and genetic variation.
        </p>
      </section>

      <section className="program-grid section-shell" aria-label="Research programs">
        {researchPrograms.map((program) => (
          <article className="program-card" key={program.title}>
            <p>{program.eyebrow}</p>
            <h3>{program.title}</h3>
            <span>{program.text}</span>
          </article>
        ))}
      </section>
    </>
  );
}
