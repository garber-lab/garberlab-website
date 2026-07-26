import { fundingAcknowledgments } from "../data/homepage";

export function FundingSection() {
  return (
    <section className="section-shell funding" aria-label="Funding and consortia">
      <div className="section-heading">
        <p className="kicker">Funding &amp; consortia</p>
        <h2>Supported by</h2>
      </div>
      <div className="funding-list">
        {fundingAcknowledgments.map((item) => (
          <div className="funding-item" key={item.name}>
            <strong>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </strong>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
