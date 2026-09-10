import {
  formatCommentaryDate,
  getCommentaryItems,
  type CommentaryItem,
} from "../data/commentary";

export function CommentaryListItem({ item }: { item: CommentaryItem }) {
  return (
    <article className="commentary-item">
      <div className="commentary-meta">
        <time dateTime={item.date}>{formatCommentaryDate(item.date)}</time>
      </div>
      <div className="commentary-body">
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <div className="commentary-links">
          <a
            className="text-link"
            href={item.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on LinkedIn ↗
          </a>
          {item.sourceLink ? (
            <a
              className="text-link"
              href={item.sourceLink.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.sourceLink.label} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function CommentarySection() {
  const items = getCommentaryItems();

  return (
    <section className="section-shell commentary" id="commentary">
      <div className="section-heading">
        <p className="kicker">Commentary</p>
        <h1>Notes on papers and ideas</h1>
        <p>
          Occasional reactions to papers and ideas worth thinking about out loud, cross-posted
          from LinkedIn.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="commentary-list">
          {items.map((item) => (
            <CommentaryListItem item={item} key={`${item.date}-${item.title}`} />
          ))}
        </div>
      ) : (
        <div className="publication-empty">No commentary yet.</div>
      )}
    </section>
  );
}
