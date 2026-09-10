// Supports a minimal inline link syntax in prose text: [label](url), styled
// via the site-wide .text-link class (see globals.css). Lets a bio or story
// paragraph hyperlink the specific thing it's describing (e.g. a paper)
// instead of bolting on a separate, out-of-context link button.
export function renderWithLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, url] = match;
    return (
      <a key={i} className="text-link" href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  });
}
