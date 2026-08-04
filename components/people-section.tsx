import { peopleGroups, type LabPerson } from "../data/people";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function PersonCard({
  person,
  variant = "alumnus",
}: {
  person: LabPerson;
  variant?: "current" | "alumnus";
}) {
  const now = [person.currentRole, person.institution].filter(Boolean).join(", ");
  const nowLabel = variant === "current" ? "Affiliation:" : "Now:";
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
        <p className="person-dates">{person.dates}</p>
        {person.role ? <p className="person-role">{person.role}</p> : null}
        {person.focus ? <p>{person.focus}</p> : null}
        {now || person.workingOn || person.link ? (
          <div className="person-now">
            {now ? (
              <p className="person-now-line">
                <strong>{nowLabel}</strong> {now}
              </p>
            ) : null}
            {person.workingOn ? (
              <p className="person-now-line">
                <strong>Working on:</strong> {person.workingOn}
              </p>
            ) : null}
            {person.link ? (
              <p className="person-now-line">
                <a href={person.link} target="_blank" rel="noopener noreferrer">
                  Profile ↗
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function PeopleSection() {
  return (
    <section className="section-shell people" id="people">
      <div>
        <p className="kicker">People</p>
        <h1>A cross-disciplinary lab</h1>
        <p>
          We will add group member names, photos, short bios, alumni, and collaborator highlights
          here. The structure is ready for current members and past trainees across computational,
          experimental, and clinical roles.
        </p>
      </div>
      <div className="people-directory">
        <h2 className="people-directory-heading">Current members</h2>
        {peopleGroups.map((group) => (
          <section className="people-group" key={`current-${group.title}`}>
            <h3>{group.title}</h3>
            {group.current.length > 0 ? (
              <div className="people-card-list">
                {group.current.map((person) => (
                  <PersonCard person={person} variant="current" key={`${group.title}-${person.name}`} />
                ))}
              </div>
            ) : (
              <div className="people-empty">Add current members in the people data file.</div>
            )}
          </section>
        ))}

        <h2 className="people-directory-heading">Alumni and past members</h2>
        {peopleGroups
          .filter((group) => !group.hideAlumni)
          .map((group) => (
            <section className="people-group" key={`alumni-${group.title}`}>
              <h3>{group.title}</h3>
              {group.alumni.length > 0 ? (
                <div className="people-card-list">
                  {group.alumni.map((person) => (
                    <PersonCard person={person} key={`${group.title}-${person.name}`} />
                  ))}
                </div>
              ) : (
                <div className="people-empty">Add alumni or past members in the people data file.</div>
              )}
            </section>
          ))}
      </div>
    </section>
  );
}
