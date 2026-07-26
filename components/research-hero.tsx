export function ResearchHero() {
  return (
    <section className="research-hero">
      <div className="section-shell research-hero-inner">
        <div className="research-hero-copy">
          <p className="kicker">Research approach</p>
          <h1>Disease as a cell-to-cell signaling network</h1>
          <p className="lede">
            Genetics, cytokine responses, spatial context — every thread below maps onto the same
            underlying question: which cells are talking to which, and how does that conversation
            change in disease?
          </p>
        </div>
        <figure className="research-hero-figure">
          <img
            src="/assets/cell-signaling-network.webp"
            alt="Cell-cell communication network in skin across dendritic cells, keratinocytes, macrophages, melanocytes, and T cells, shown as a raw interaction graph and a clustered community view"
          />
          <figcaption>
            An early map of dendritic cell, keratinocyte, macrophage, melanocyte, and T cell
            signaling in skin — a shared-neighbor graph (left) resolved into communities (right).
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
