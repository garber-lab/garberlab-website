import { figureHighlights } from "../data/homepage";

export function FigureHighlightsSection() {
  return (
    <section className="section-shell figure-highlights" aria-label="Figure highlights from recent work">
      <div className="section-heading">
        <p className="kicker">From paper to program</p>
        <h2>Recent work gives us a map for the next questions</h2>
      </div>
      <div className="figure-card-grid">
        {figureHighlights.map((figure) => (
          <article className="figure-card" key={figure.title}>
            <img src={figure.image} alt="" />
            <div>
              <h3>{figure.title}</h3>
              <p>{figure.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
