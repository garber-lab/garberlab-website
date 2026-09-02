export type SelectedPublicationSource = {
  pmid?: string;
  doi?: string;
  note?: string;
};

export type PublicationSectionSource = {
  title: string;
  description: string;
  publications: SelectedPublicationSource[];
};

export const publicationSections: PublicationSectionSource[] = [
  {
    title: "Skin autoimmunity and inflammation",
    description:
      "Human skin disease is our main system for understanding autoimmunity thanks for sample availability.",
    publications: [
      // Nat Immunol 2026 - CD14/photosensitive autoimmunity paper and cover feature.
      {
        doi: "10.1038/s41590-026-02502-w",
        note: "Explaining UV sensitivity through a three cell type circuit",
      },
      // J Invest Dermatol 2025 - allergic versus irritant contact dermatitis.
      {
        doi: "10.1016/j.jid.2024.09.008",
        note:
          "Eczema and allergic skin reactions present similarly, but are they molecularly distinct?",
      },
      
    ],
  },
  {
    title: "Initial forays into single-cell genomics",
    description:
      "Early single-cell projects, including work built around in-house inDrop and related profiling approaches, shaped how we think about heterogeneous cellular responses.",
    publications: [
      {
        doi: "10.1126/scitranslmed.abd8995",
        note: 
        "Our first application of in-drop to blister byopsies revealed a pre-clinical state in non-lesional skin and a key role for the IL15 receptor"
      },
      {
        doi: "10.1371/journal.pgen.1010221",
        note: "Pinpointed cell type specific transcriptional state in a mouse fragile X model",
      },
    ],
  },
  {
    title: "Gene regulation in immune cells",
    description:
      "Foundational lab work on how immune cell gene programs are built and dynamically controlled — the toolkit and comparative framework underneath our current disease work.",
    publications: [
      {
        doi: "10.1016/j.molcel.2012.07.030",
        note: "A high-throughput ChIP-seq approach revealing principles of dynamic gene regulation as dendritic cells respond to pathogen stimulation",
      },
      {
        doi: "10.1016/j.cels.2018.01.002",
        note: "Comparing regulatory elements across immune cell types reveals a conserved regulatory lexicon",
      },
      {
        doi: "10.1016/j.molcel.2020.09.005",
        note: "Multiway proximal interactions mapped by SPRITE coupled with immunoprecipitation (SIP) revealed transcriptional hubs in the early response of dendritic cells to LPS",
      },
    ],
  },
  {
    title: "Method and application development",
    description:
      "Computational and experimental methods that make it possible to measure regulatory programs, perturbations, and cell states at scale.",
    publications: [
      // Add DOI or PMID entries here.
       // Nat Commun 2025 - Worm Perturb-Seq journal version.
      {
        doi: "10.1038/s41467-025-60154-0",
        note: "Worm Perturb-Seq methods, analytical framework, and library construction",
      },
      {
        doi: "10.1186/s12864-020-6714-x",
        note: "Our automated, versioned controlled pipeline designer and runner -- developed by Alper Kucukural in the bioinformatics core",
      },
      {
        doi: "10.1038/nbt.1633",
        note: "Scripture: one of the first transcript assemblers from RNA-seq data",
      },
      {
        doi: "10.1093/bioinformatics/btp190",
        note: "SiPhy: Single site estimation of evolutionary constraint using biased substitution patterns",
      },
    ],
  },
];
