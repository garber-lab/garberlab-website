import Link from "next/link";
import { researchPrograms } from "../data/homepage";

export function LandingProgramsPreview() {
  const preview = researchPrograms.slice(0, 3);

  return (
    <section className="section-shell landing-programs" aria-label="Research programs preview">
      <div className="landing-section-heading">
        <div>
          <p className="kicker">What we work on</p>
          <h2>Skin as a human model of autoimmunity and autoinflammatory conditions</h2>
        </div>
        <Link className="landing-link" href="/research">
          Explore all research →
        </Link>
      </div>
      <div className="landing-program-grid">
        {preview.map((program) => (
          <article className="program-card" key={program.title}>
            <p>{program.eyebrow}</p>
            <h3>{program.title}</h3>
            <span>{program.text}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
