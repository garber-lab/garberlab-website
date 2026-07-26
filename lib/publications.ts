import {
  publicationSections,
  type SelectedPublicationSource,
} from "../data/selected-publications";

export type SelectedPublication = {
  id: string;
  pmid?: string;
  note?: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url: string;
};

export type SelectedPublicationSection = {
  title: string;
  description: string;
  publications: SelectedPublication[];
};

type EuropePmcResult = {
  pmid?: string;
  title?: string;
  authorString?: string;
  journalTitle?: string;
  pubYear?: string;
  doi?: string;
};

function cleanText(value = "") {
  return value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fromFallback(source: SelectedPublicationSource): SelectedPublication {
  const id = source.doi ?? source.pmid ?? "unknown-publication";
  return {
    id,
    pmid: source.pmid,
    note: source.note,
    title: source.doi ? `DOI record ${source.doi}` : `PubMed record ${source.pmid}`,
    authors: "Publication metadata unavailable",
    journal: source.doi ? "DOI" : "PubMed",
    year: "",
    doi: source.doi,
    url: source.doi
      ? `https://doi.org/${source.doi}`
      : `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`,
  };
}

async function fetchPublication(source: SelectedPublicationSource): Promise<SelectedPublication> {
  const id = source.doi ?? source.pmid;
  if (!id) {
    return fromFallback(source);
  }

  const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
  url.searchParams.set(
    "query",
    source.doi ? `DOI:"${source.doi}"` : `EXT_ID:${source.pmid} AND SRC:MED`,
  );
  url.searchParams.set("format", "json");
  url.searchParams.set("pageSize", "1");

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!response.ok) {
      return fromFallback(source);
    }

    const data = await response.json();
    const result = data?.resultList?.result?.[0] as EuropePmcResult | undefined;
    if (!result) {
      return fromFallback(source);
    }

    return {
      id,
      pmid: result.pmid ?? source.pmid,
      note: source.note,
      title: cleanText(result.title) || (source.doi ? `DOI record ${source.doi}` : `PubMed record ${source.pmid}`),
      authors: cleanText(result.authorString) || "Publication metadata unavailable",
      journal: cleanText(result.journalTitle) || (source.doi ? "DOI" : "PubMed"),
      year: result.pubYear || "",
      doi: result.doi ?? source.doi,
      url: source.doi
        ? `https://doi.org/${source.doi}`
        : `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`,
    };
  } catch {
    return fromFallback(source);
  }
}

export async function getSelectedPublications() {
  return Promise.all(
    publicationSections.map(async (section) => ({
      title: section.title,
      description: section.description,
      publications: await Promise.all(section.publications.map(fetchPublication)),
    })),
  );
}
