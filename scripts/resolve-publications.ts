// Resolves DOI/PMID entries in data/selected-publications.ts against Europe PMC
// and writes the result to data/publications-resolved.json, which is committed
// and read by lib/publications.ts at build time. Run this manually after adding
// or changing a publication:
//
//   npm run resolve-publications
//
// A fetch failure keeps the previously committed entry instead of overwriting
// it with placeholder text, so the site is never worse than the last time this
// script ran successfully.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { publicationSections } from "../data/selected-publications.ts";

const outputUrl = new URL("../data/publications-resolved.json", import.meta.url);
const outputPath = fileURLToPath(outputUrl);

type ResolvedEntry = {
  pmid?: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url: string;
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

async function fetchFromEuropePmc(doi?: string, pmid?: string): Promise<ResolvedEntry | undefined> {
  const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
  url.searchParams.set("query", doi ? `DOI:"${doi}"` : `EXT_ID:${pmid} AND SRC:MED`);
  url.searchParams.set("format", "json");
  url.searchParams.set("pageSize", "1");

  const response = await fetch(url);
  if (!response.ok) return undefined;

  const data = await response.json();
  const result = data?.resultList?.result?.[0] as EuropePmcResult | undefined;
  const title = cleanText(result?.title);
  if (!result || !title) return undefined;

  return {
    pmid: result.pmid ?? pmid,
    title,
    authors: cleanText(result.authorString) || "Authors unavailable",
    journal: cleanText(result.journalTitle) || (doi ? "DOI" : "PubMed"),
    year: result.pubYear ?? "",
    doi: result.doi ?? doi,
    url: doi ? `https://doi.org/${doi}` : `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
  };
}

async function main() {
  let existing: Record<string, ResolvedEntry> = {};
  try {
    existing = JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    // No committed cache yet - first run.
  }

  const sources = new Map<string, { doi?: string; pmid?: string }>();
  for (const section of publicationSections) {
    for (const publication of section.publications) {
      const id = publication.doi ?? publication.pmid;
      if (id) sources.set(id, { doi: publication.doi, pmid: publication.pmid });
    }
  }

  const resolved: Record<string, ResolvedEntry> = {};
  let updated = 0;
  let keptCached = 0;
  const missing: string[] = [];

  for (const [id, { doi, pmid }] of sources) {
    let entry: ResolvedEntry | undefined;
    try {
      entry = await fetchFromEuropePmc(doi, pmid);
    } catch (error) {
      console.warn(`Fetch failed for ${id}: ${error instanceof Error ? error.message : error}`);
    }

    if (entry) {
      resolved[id] = entry;
      updated += 1;
    } else if (existing[id]) {
      resolved[id] = existing[id];
      keptCached += 1;
      console.warn(`Could not refresh ${id} from Europe PMC; keeping previously committed metadata.`);
    } else {
      missing.push(id);
    }
  }

  const sorted: Record<string, ResolvedEntry> = {};
  for (const key of Object.keys(resolved).sort()) {
    sorted[key] = resolved[key];
  }

  await writeFile(outputPath, `${JSON.stringify(sorted, null, 2)}\n`);

  console.log(`Resolved ${updated} publication(s) from Europe PMC.`);
  if (keptCached > 0) {
    console.log(`Kept ${keptCached} previously committed entr${keptCached === 1 ? "y" : "ies"} (fetch failed this run).`);
  }
  if (missing.length > 0) {
    console.error(`No metadata (fresh or cached) for: ${missing.join(", ")}`);
    process.exitCode = 1;
  }
}

main();
