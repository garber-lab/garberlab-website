export type CommentaryItem = {
  /** ISO date, "YYYY-MM-DD". Used for sorting and display. */
  date: string;
  title: string;
  excerpt: string;
  linkedinUrl: string;
  sourceLink?: { label: string; url: string };
};

// Add new items anywhere in this list — they are sorted by date automatically.
// Dates marked TODO are approximate (read off LinkedIn's "1mo"/"2mo" relative
// timestamps) and need to be corrected to the actual post date.
export const commentaryItems: CommentaryItem[] = [
  {
    date: "2026-08-10", // TODO: approximate, correct exact date
    title: "PD-1 CAR T cells for MS — and a comparison to our skin data",
    excerpt:
      "A masterful and technically unbelievably impressive study from Ido Amit's lab identifies a rare population of chronically activated PD-1+ Tfh-like CD4 T cells in the cerebrospinal fluid of people with multiple sclerosis, then engineers PD-1-directed CAR T cells that suppress disease in a mouse model. We see a strikingly similar PD-1+ Tfh-like population in our own skin autoinflammation data — but without the corresponding B-cell expansion or IL-10 program described here, which raises the question of what tissue-specific conditions permit that difference.",
    linkedinUrl:
      "https://www.linkedin.com/posts/manuel-garber-306a4_a-masterful-and-technically-unbelievably-activity-7486167616076750848-5An9",
  },
  {
    date: "2026-07-10", // TODO: approximate, correct exact date
    title: "What NIH funding history says about where biomedical innovation starts",
    excerpt:
      "Prompted by an op-ed arguing that private investment could replace the NIH as an engine of biomedical innovation, I traced the funding history behind checkpoint inhibitors, now central to cancer immunotherapy. More than a decade of NIH-funded basic research on T-cell activation and tolerance, led early on by NIAID rather than NCI, preceded any company deciding to develop a CTLA-4 or PD-1 antibody. Industry was indispensable in turning the discoveries into medicines, but the opportunity it pursued had already been sustained for years by public funding.",
    linkedinUrl:
      "https://www.linkedin.com/posts/manuel-garber-306a4_thanks-for-this-post-elizabeth-ginexi-https-activity-7479215427689082880-U4ba",
  },
  {
    date: "2026-07-08", // TODO: approximate, correct exact date
    title: "Could autoimmune disease develop like cancer, through stepwise somatic evolution?",
    excerpt:
      "A paper by Nicola et al. led me to Christopher Goodnow's 2007 proposal that autoimmune disease might develop the way cancer does: through the stepwise accumulation of events that let self-reactive clones escape immune checkpoints, rather than a single environmental trigger acting on genetic risk. Using highly accurate whole-exome sequencing, the authors found hundreds of independent B-cell clones with recurrent loss-of-function mutations in TNFRSF14 and CD274 in autoimmune thyroid disease, even in Hashimoto's, usually considered T-cell-mediated. It points toward a more testable framework: asking which inflammatory events act on which somatic alterations to push a clone into disease.",
    linkedinUrl:
      "https://www.linkedin.com/posts/manuel-garber-306a4_multistep-pathogenesis-of-autoimmune-disease-activity-7476264196943396864-mZ6-",
  },
];

function toTime(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1).getTime();
}

/** Newest first. */
export function getCommentaryItems(limit?: number): CommentaryItem[] {
  const sorted = [...commentaryItems].sort((a, b) => toTime(b.date) - toTime(a.date));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-07-01" -> "July 2026". Parsed by hand to avoid timezone drift. */
export function formatCommentaryDate(isoDate: string): string {
  const [year, month] = isoDate.split("-").map(Number);
  const name = MONTHS[(month ?? 1) - 1] ?? "";
  return name ? `${name} ${year}` : String(year);
}
