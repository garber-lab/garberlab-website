export type ResearchProgram = {
  eyebrow: string;
  title: string;
  text: string;
  link?: string;
  linkLabel?: string;
};

export type FigureHighlight = {
  image: string;
  title: string;
  text: string;
};

export type MethodItem = {
  title: string;
  text: string;
};

export type FundingItem = {
  name: string;
  description: string;
  link?: string;
};

export const researchPrograms: ResearchProgram[] = [
  {
    eyebrow: "Comparative disease biology",
    title: "Why compare across autoimmune skin diseases?",
    text: "Vitiligo, cutaneous lupus, dermatomyositis, psoriasis, and hidradenitis suppurativa can look clinically similar yet respond very differently to the same exposures and treatments — IL-17 inhibitors help psoriasis, JAK inhibitors help vitiligo, rarely both. We treat that divergence as the opportunity: comparing across diseases is more likely to yield durable insight into basic immunology and therapeutics than studying any one alone.",
  },
  {
    eyebrow: "Cytokine response atlas",
    title: "What is a lesion actually responding to?",
    text: "We stimulate primary and ex vivo skin cells — keratinocytes, fibroblasts, immune and other stromal populations — with individual cytokines to build a cell-type-specific response atlas, then use it to decompose disease signatures instead of reading them as generic inflammation.",
  },
  {
    eyebrow: "Genetics of cytokine response",
    title: "Do risk variants act by changing how cells respond?",
    text: "Skin autoimmune diseases are polygenic. With the IGVF consortium we combine genotyping, RNA-seq, ATAC-seq, and H3K27ac ChIP-seq to map response QTLs — variants that shift a cell's cytokine response rather than its baseline expression — and have linked variants near ERAP2 and HLA-DRB5 in melanocytes to interferon-γ antigen presentation.",
  },
  {
    eyebrow: "Prospective cohorts",
    title: "Catching autoimmunity as it begins",
    text: "The VIGOR and CLuES studies follow people with vitiligo and cutaneous lupus, and their unaffected family members, over several years with fully remote at-home sampling — tracking genetic, environmental, and skin biomarker change before and during disease onset or progression.",
    link: "https://vigor.umassmed.edu",
    linkLabel: "vigor.umassmed.edu",
  },
  {
    eyebrow: "Myeloid biology",
    title: "Macrophage and dendritic cell state transitions",
    text: "A central theme is how CD14+ myeloid cells, macrophages, and dendritic cells move through continuous transcriptional states. We are especially interested in resident-like, inflammatory, and disease-specific branches that emerge in tissue.",
  },
  {
    eyebrow: "Spatial genomics",
    title: "Tissue circuits that organize inflammation",
    text: "Using spatial transcriptomics and single-cell profiling, we map where immune states sit in skin, which neighboring cells shape them, and how keratinocytes, fibroblasts, lymphocytes, and myeloid cells form inflammatory neighborhoods.",
  },
  {
    eyebrow: "Gene regulation in immune cells",
    title: "The regulatory logic of immune cell activation",
    text: "Long before the disease-focused work above, we asked how immune cells dynamically rewire their gene programs — developing high-throughput ChIP-seq methods to capture regulation as dendritic cells respond to pathogens, mapping a conserved regulatory lexicon shared across immune cell types, and tracing the 3D genome hubs that form during that response. That toolkit remains the foundation underneath everything above.",
  },
];

export const figureHighlights: FigureHighlight[] = [
  {
    image: "/assets/spatial-tissue-context.png",
    title: "Spatial neighborhoods",
    text: "CD14+ myeloid states occupy reproducible tissue contexts across inflammatory skin diseases.",
  },
  {
    image: "/assets/cd14-diffusion-map.png",
    title: "Continuous cell states",
    text: "Diffusion geometry helps convert heterogeneous cells into a model of state progression.",
  },
  {
    image: "/assets/spatial-cytokine-map.png",
    title: "Tissue-instructed signals",
    text: "Spatial maps link inflammatory cytokines and cellular neighborhoods inside the lesion.",
  },
];

export const methodItems: MethodItem[] = [
  {
    title: "Single-cell and spatial profiling",
    text: "Cell states, tissue neighborhoods, disease-specific programs.",
  },
  {
    title: "Human perturbation",
    text: "UV challenge, treatment response, longitudinal and nonlesional sampling.",
  },
  {
    title: "Functional genomics",
    text: "Regulatory variants, response QTLs, perturb-seq, and sequence-to-function models.",
  },
];

export const fundingAcknowledgments: FundingItem[] = [
  {
    name: "NIH Common Fund — IGVF Consortium",
    description:
      "Impact of Genomic Variation on Function. With the Weng lab: predictive modeling of the functional and phenotypic impact of genetic variants, including response QTLs in skin.",
    link: "https://igvf.org",
  },
  {
    name: "NIH Common Fund — SMaHT Network",
    description:
      "Somatic Mosaicism across Human Tissues. With the Fazzio lab: carCUT&Tag, a method for identifying and characterizing sequence variants in regulatory elements and genes.",
    link: "https://smaht.org",
  },
  {
    name: "NIH U01 — VIGOR / CLuES",
    description:
      "With Harris and Rashighi: predictive drivers of new-onset, relapse, and progression of human autoimmunity in skin.",
    link: "https://vigor.umassmed.edu",
  },
  {
    name: "NIH P50 (Project II)",
    description: "With Richmond: cell-cell communication and tissue memory in vitiligo.",
  },
  {
    name: "NIH R01",
    description: "With DeVito: interrogating the clonal repertoire in drug hypersensitivity reactions.",
  },
];

export const storyPoints = [
  "CD14+ myeloid cells expand in photosensitive disease.",
  "Resident-like and inflammatory states form a continuum.",
  "Fibroblast and keratinocyte signals shape tissue recruitment.",
  "HS may reveal a distinct CCR2+ branch of the program.",
];
