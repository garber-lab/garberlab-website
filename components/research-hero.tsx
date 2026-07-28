export function ResearchHero() {
  return (
    <section className="research-hero">
      <div className="section-shell research-hero-inner">
        <div className="research-hero-copy">
          <p className="kicker">Research approach</p>
          <h1>From Regulatory Programs to Tissue Inflammation</h1>
          <p className="lede">
            We study skin autoimmunity as a breakdown in how tissue components communicate. 
            By combining clinical data, prospective human cohorts, ex vivo systems, 
            and reductionist in vitro models, we ask how cytokine responses, chemokine gradients, 
            stromal signals, immune states, and spatial context come together to produce disease. 
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
