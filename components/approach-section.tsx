import { methodItems } from "../data/homepage";

export function ApproachSection() {
  return (
    <section className="section-shell figure-band" id="approach">
      <div className="figure-copy">
        <p className="kicker">How we work</p>
        <h2>Measure, map, perturb, model</h2>
        <p>
          Our projects combine patient-centered cohorts, single-cell genomics, spatial
          transcriptomics, cytokine and UV perturbation, and computational models that turn complex
          tissue measurements into testable mechanisms.
        </p>
      </div>
      <div className="method-list">
        {methodItems.map((item) => (
          <div key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
