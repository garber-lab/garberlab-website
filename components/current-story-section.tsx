import { storyPoints } from "../data/homepage";

export function CurrentStorySection() {
  return (
    <section className="section-shell current-story">
      <div>
        <p className="kicker">Current convergence</p>
        <h2>Macrophages, dendritic cells, and the regulatory logic of inflammation</h2>
        <p>
          Recent work points us toward a shared theme: myeloid and dendritic cells do not simply
          appear as fixed categories. They move through tissue-instructed programs that can be
          mapped, perturbed, and connected back to regulatory sequence and disease risk.
        </p>
      </div>
      <div className="story-points">
        {storyPoints.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </section>
  );
}
