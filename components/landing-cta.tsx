import Link from "next/link";

export function LandingCta() {
  return (
    <section className="section-shell landing-cta" aria-label="Join the lab">
      <div>
        <p className="kicker">Join and collaborate</p>
        <h2>Interested in problems with tissue, data, and mechanism?</h2>
      </div>
      <Link className="button button-primary" href="/join">
        See how to join
      </Link>
    </section>
  );
}
