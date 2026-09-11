import {
  coreChapters,
  coreIntro,
  corePeople,
  coreToday,
  type CorePerson,
} from "../data/bioinformatics-core";
import { renderWithLinks } from "./render-with-links";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function CorePersonCard({ person }: { person: CorePerson }) {
  return (
    <article className="person-card">
      {person.image ? (
        <img src={person.image} alt={`${person.name} portrait`} />
      ) : (
        <span className="person-photo-placeholder" aria-hidden="true">
          {getInitials(person.name)}
        </span>
      )}
      <div>
        <h4>{person.name}</h4>
        <p className="person-role">{person.role}</p>
        <p>{renderWithLinks(person.bio)}</p>
        {person.link ? (
          <div className="person-now">
            <p className="person-now-line">
              <a href={person.link} target="_blank" rel="noopener noreferrer">
                {person.linkLabel ?? "Profile ↗"}
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function CoreSection() {
  return (
    <section className="section-shell core" id="core">
      <div className="section-heading core-intro">
        <p className="kicker">{coreIntro.kicker}</p>
        <h1>{coreIntro.title}</h1>
        <p>{coreIntro.lead}</p>
      </div>

      <div className="core-chapters">
        {coreChapters.map((chapter) => (
          <article className="core-chapter" key={chapter.title}>
            <p className="core-period">{chapter.period}</p>
            <div className="core-chapter-body">
              <h2>{chapter.title}</h2>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderWithLinks(paragraph)}</p>
              ))}
            </div>
          </article>
        ))}

        <article className="core-chapter">
          <p className="core-period">{coreToday.period}</p>
          <div className="core-chapter-body">
            <h2>{coreToday.title}</h2>
            <p>{coreToday.intro}</p>
            <ul className="core-services">
              {coreToday.services.map((service) => (
                <li key={service}>{renderWithLinks(service)}</li>
              ))}
            </ul>
            <p>
              {coreToday.contactLead}{" "}
              <a href={`mailto:${coreToday.email}`}>{coreToday.email}</a>,{" "}
              {coreToday.websiteLead}{" "}
              <a
                href={coreToday.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coreToday.website.replace(/^https?:\/\//, "")}
              </a>
              .
            </p>
          </div>
        </article>
      </div>

      <div className="core-people">
        <h2 className="people-directory-heading">The people who built it</h2>
        <div className="people-card-list">
          {corePeople.map((person) => (
            <CorePersonCard person={person} key={person.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
