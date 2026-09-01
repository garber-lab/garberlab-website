import { resources, resourcesIntro, type ResourceLink } from "../data/resources";

function LinkRow({ label, links }: { label: string; links: ResourceLink[] }) {
  return (
    <p className="resource-meta">
      <span className="resource-meta-label">{label}</span>
      {links.map((link, index) => (
        <span key={link.url}>
          {index > 0 ? <span aria-hidden="true"> · </span> : null}
          <a
            className="resource-meta-link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        </span>
      ))}
    </p>
  );
}

export function ResourcesSection() {
  return (
    <section className="section-shell resources" id="resources">
      <div className="section-heading">
        <p className="kicker">Resources</p>
        <h1>Data portals and software</h1>
        <p>{resourcesIntro}</p>
      </div>

      <div className="resource-list">
        {resources.map((resource) => (
          <article className="resource-item" key={resource.id}>
            <div className="resource-body">
              <h2>
                <a
                  href={resource.primary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </h2>
              <p className="resource-tagline">{resource.tagline}</p>
              <p className="resource-description">{resource.description}</p>

              {resource.links?.length ? (
                <LinkRow label="Also" links={resource.links} />
              ) : null}
              {resource.code?.length ? (
                <LinkRow label="Code" links={resource.code} />
              ) : null}
              {resource.data?.length ? (
                <LinkRow label="Data" links={resource.data} />
              ) : null}
            </div>

            <aside className="resource-aside">
              <a
                className="button button-secondary resource-launch"
                href={resource.primary.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {resource.primary.label}
              </a>
              <p className="resource-citation">
                {resource.paper.citation}{" "}
                <a
                  className="publication-doi"
                  href={resource.paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the paper
                </a>
              </p>
            </aside>
          </article>
        ))}
      </div>
    </section>
  );
}
