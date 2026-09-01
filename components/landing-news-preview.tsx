import Link from "next/link";
import { getNewsItems } from "../data/news";
import { NewsListItem } from "./news-section";

export function LandingNewsPreview() {
  const items = getNewsItems(3);

  if (items.length === 0) return null;

  return (
    <section className="section-shell news news-preview" aria-label="Lab news">
      <div className="landing-section-heading">
        <div>
          <p className="kicker">News</p>
          <h2>What&rsquo;s happening in the lab</h2>
        </div>
        <Link className="landing-link" href="/news">
          All news
        </Link>
      </div>

      <div className="news-list">
        {items.map((item) => (
          <NewsListItem item={item} key={`${item.date}-${item.title}`} />
        ))}
      </div>
    </section>
  );
}
