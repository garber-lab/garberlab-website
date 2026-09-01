export type NewsCategory = "paper" | "people" | "resource" | "award" | "talk";

export type NewsItem = {
  /** ISO date, "YYYY-MM-DD". Used for sorting and display. */
  date: string;
  category: NewsCategory;
  title: string;
  /** Optional sentence or two of detail. */
  body?: string;
  link?: { label: string; url: string };
};

export const newsCategoryLabels: Record<NewsCategory, string> = {
  paper: "Paper",
  people: "People",
  resource: "Resource",
  award: "Award",
  talk: "Talk",
};

// Add new items anywhere in this list — they are sorted by date automatically.
// Dates marked TODO are placeholders and need to be corrected.
export const newsItems: NewsItem[] = [
  {
    date: "2026-08-12",
    category: "award",
    title: "LEO Foundation Research Grant to continue the photosensitivity work",
    body: "The LEO Foundation awarded DKK 61.9 million across 16 international skin research projects, ours among them, supporting continued study of photosensitive skin reactions.",
    link: {
      label: "LEO Foundation announcement",
      url: "https://leo-foundation.org/en/2026/08/12/dkk-61-9-million-awarded-to-advance-skin-research/",
    },
  },
  {
    // Published 24 April 2026; issue date June 2026.
    date: "2026-04-24",
    category: "paper",
    title:
      "Our photosensitivity paper is out in Nature Immunology, with the cover",
    body: "A spatially coordinated keratinocyte-fibroblast circuit recruits MMP9+ myeloid cells to drive IFN-I-driven inflammation in photosensitive autoimmunity.",
    link: {
      label: "Read the paper",
      url: "https://doi.org/10.1038/s41590-026-02502-w",
    },
  },
  {
    date: "2026-05-01",
    category: "people",
    title: "Yuqing Wang graduated",
    body: "Yuqing defended her thesis on the mechanisms of photosensitivity in autoimmune skin disease, and is now a Bioinformatics Scientist at New England Biolabs.",
  },
  {
    date: "2025-05-23",
    category: "paper",
    title: "Worm Perturb-Seq is out in Nature Communications",
    body: "A collaboration with the Walhout laboratory, led by Xuhang Li and Hefei Zhang, presenting a method for high-resolution RNA-seq across hundreds of replicate whole-animal perturbations at once, together with the EmpirDE analytical framework.",
    link: {
      label: "Read the paper",
      url: "https://doi.org/10.1038/s41467-025-60154-0",
    },
  },
  {
    // TODO: split into two items if the Broad move was much later than the defense
    date: "2025-05-01",
    category: "people",
    title: "Yuming Cao defended her thesis and graduated",
  },
];

function toTime(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1).getTime();
}

/** Newest first. */
export function getNewsItems(limit?: number): NewsItem[] {
  const sorted = [...newsItems].sort((a, b) => toTime(b.date) - toTime(a.date));
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
export function formatNewsDate(isoDate: string): string {
  const [year, month] = isoDate.split("-").map(Number);
  const name = MONTHS[(month ?? 1) - 1] ?? "";
  return name ? `${name} ${year}` : String(year);
}
