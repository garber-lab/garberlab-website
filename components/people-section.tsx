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

function PersonCard({ person }: { person: LabPerson }) {
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
        <p>{person.focus}</p>
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
        {peopleGroups.map((group) => (
          <section className="people-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="people-roster">
              <div>
                <h4>Current</h4>
                {group.current.length > 0 ? (
                  <div className="people-card-list">
                    {group.current.map((person) => (
                      <PersonCard person={person} key={`${group.title}-${person.name}`} />
                    ))}
                  </div>
                ) : (
                  <div className="people-empty">Add current members in the people data file.</div>
                )}
              </div>
              <div>
                <h4>Alumni and past members</h4>
                {group.alumni.length > 0 ? (
                  <div className="people-card-list">
                    {group.alumni.map((person) => (
                      <PersonCard person={person} key={`${group.title}-${person.name}`} />
                    ))}
                  </div>
                ) : (
                  <div className="people-empty">Add alumni or past members in the people data file.</div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
