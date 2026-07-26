import type { SelectedPublicationSection } from "../lib/publications";

type PublicationsSectionProps = {
  selectedPublications: SelectedPublicationSection[];
};

export function PublicationsSection({ selectedPublications }: PublicationsSectionProps) {
  return (
    <section className="section-shell publications" id="publications">
      <div className="section-heading">
        <p className="kicker">Selected publications</p>
        <h1>Selected publications by theme</h1>
        <p>
          These sections are built from DOI or PMID entries in a small editable data file. The short
          descriptions are meant to explain how each set fits into the lab story.
        </p>
      </div>
      <div className="publication-sections">
        {selectedPublications.map((section) => (
          <section className="publication-section" key={section.title}>
            <div className="publication-section-intro">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="publication-list">
              {section.publications.length > 0 ? (
                section.publications.map((publication) => (
                  <article className="publication-item" key={publication.id}>
                    <div>
                      {publication.note ? (
                        <span className="publication-note">{publication.note}</span>
                      ) : null}
                      <strong>{publication.title}</strong>
                      <span>{publication.authors}</span>
                    </div>
                    <p>
                      {publication.journal}
                      {publication.year ? `, ${publication.year}` : ""}
                      {publication.doi ? (
                        <>
                          {" · "}
                          <a className="publication-doi" href={`https://doi.org/${publication.doi}`}>
                            doi:{publication.doi}
                          </a>
                        </>
                      ) : null}
                    </p>
                  </article>
                ))
              ) : (
                <div className="publication-empty">Add DOI or PMID entries for this section.</div>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
