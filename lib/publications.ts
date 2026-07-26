import {
  publicationSections,
  type SelectedPublicationSource,
} from "../data/selected-publications";
import resolvedPublications from "../data/publications-resolved.json";

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

type ResolvedEntry = {
  pmid?: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url: string;
};

const resolvedCache = resolvedPublications as Record<string, ResolvedEntry>;

function resolvePublication(source: SelectedPublicationSource): SelectedPublication {
  const id = source.doi ?? source.pmid ?? "unknown-publication";
  const entry = resolvedCache[id];

  if (!entry) {
    return {
      id,
      pmid: source.pmid,
      note: source.note,
      title: source.doi ? `DOI record ${source.doi}` : `PubMed record ${source.pmid}`,
      authors: "Publication metadata not yet resolved — run `npm run resolve-publications`",
      journal: source.doi ? "DOI" : "PubMed",
      year: "",
      doi: source.doi,
      url: source.doi
        ? `https://doi.org/${source.doi}`
        : `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`,
    };
  }

  return {
    id,
    note: source.note,
    ...entry,
  };
}

export function getSelectedPublications(): SelectedPublicationSection[] {
  return publicationSections.map((section) => ({
    title: section.title,
    description: section.description,
    publications: section.publications.map(resolvePublication),
  }));
}
