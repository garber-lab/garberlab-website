import {
  formatNewsDate,
  getNewsItems,
  newsCategoryLabels,
  type NewsItem,
} from "../data/news";

export function NewsListItem({ item }: { item: NewsItem }) {
  return (
    <article className="news-item">
      <div className="news-meta">
        <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
        <span className={`news-tag news-tag-${item.category}`}>
          {newsCategoryLabels[item.category]}
        </span>
      </div>
      <div className="news-body">
        <h3>{item.title}</h3>
        {item.body ? <p>{item.body}</p> : null}
        {item.link ? (
          <a
            className="news-link"
            href={item.link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.link.label}
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function NewsSection() {
  const items = getNewsItems();

  return (
    <section className="section-shell news" id="news">
      <div className="section-heading">
        <p className="kicker">News</p>
        <h1>Lab news</h1>
        <p>
          Papers, new resources, and where people go next.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="news-list">
          {items.map((item) => (
            <NewsListItem item={item} key={`${item.date}-${item.title}`} />
          ))}
        </div>
      ) : (
        <div className="publication-empty">No news items yet.</div>
      )}
    </section>
  );
}
