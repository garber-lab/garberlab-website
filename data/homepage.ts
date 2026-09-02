export type ResearchProgram = {
  eyebrow: string;
  title: string;
  text: string;
  link?: string;
  linkLabel?: string;
  image?: string;
  imageAlt?: string;
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
    text: "Inflammatory skin diseases often reuse overlapping cytokine pathways and immune-cell and tissue-cell states, but differ in where, when, and in which cells those programs are activated. This can produce overlapping clinical or histologic patterns—as in atopic dermatitis and allergic contact dermatitis, psoriasis and psoriasiform cutaneous lupus, or dermatomyositis and cutaneous lupus—even when triggers and treatment responses differ. Comparing diseases helps separate shared inflammatory circuits from disease-defining mechanisms.",
    image: "/assets/spatial-cd14-tissue-panels.png",
    imageAlt: "Spatial tissue panels comparing psoriasis, dermatomyositis, and cutaneous lupus samples",
  },
  {
    eyebrow: "Cytokine response atlas",
    title: "Which cells are responding, and to what signals?",
    text: "We build a cell-type-specific response atlas by exposing primary human skin cells and ex vivo tissue to defined cytokines. We then use these reference programs to resolve disease signatures into their likely cellular and signaling components.",
    image: "/assets/cytokine_responses_heatmap.png",
    imageAlt: "Heatmap of gene expression responses to PBS, IFN-gamma, IFN-beta, and TNF-alpha stimulation",
  },
  {
    eyebrow: "Genetics of cytokine response",
    title: "Do genetic variants change how cells respond?",
    text: "Many inflammatory and autoimmune skin diseases are polygenic. As part of the IGVF Consortium, we integrate genotyping with RNA-seq, ATAC-seq, and H3K27ac profiling to map response QTLs—variants whose regulatory effects emerge or change after cytokine stimulation. In melanocytes, this approach has implicated loci near ERAP2 and HLA-DRB5 in IFN-γ-induced antigen-presentation programs.",
    link: "https://igvf.org/",
    linkLabel: "IGVF Consortium",
    image: "/assets/reQTL_ERAP2.png",
    imageAlt: "Response QTL plot showing genotype-dependent gene expression change from PBS to IFN-gamma stimulation",
  },
  {
    eyebrow: "Prospective cohorts",
    title: "How is autoimmunity initiated?",
    text: "The VIGOR and CLuES studies follow people with vitiligo and cutaneous lupus, and their unaffected family members, over several years with fully remote at-home sampling — tracking genetic, environmental, and skin biomarker change before and during disease onset or progression.",
    link: "https://vigor.umassmed.edu",
    linkLabel: "vigor.umassmed.edu",
    image: "/assets/vigor_website.png",
    imageAlt: "VIGOR study website landing page, 'Help Us Stop Vitiligo Before It Begins'",
  },
  {
    eyebrow: "Myeloid cell role in inflammation",
    title: "How does inflamed skin shape myeloid cell identity—and how do those states influence disease?",
    text: "We study how CD14+ monocytes, macrophages, and dendritic cells are organized along continuous and branching transcriptional programs in skin. We focus on resident-like, inflammatory, and disease-associated states—and on the signals and functions that distinguish them.",
    image: "/assets/cd14-transition-program.png",
    imageAlt: "M2 macrophage marker heatmaps and diffusion maps tracing the CD14+ myeloid transition program",
  },
  {
    eyebrow: "Tissue Immunology",
    title: "What organizes inflammation in skin?",
    text: "Using spatial transcriptomics and single-cell profiling, we reconstruct the cellular neighborhoods of diseased skin. We ask how local interactions among epithelial, stromal, and immune cells sustain—or restrain—inflammation.",
    image: "/assets/lesion_chemokine_recruitment.png",
    imageAlt: "Chemokine receptor expression across the CD14+ transition linked to spatial chemokine ligand trajectories across fibroblast, endothelial, and myeloid cell types",
  },
  {
    eyebrow: "Regulatory genomics",
    title: "How do enhancers coordinate immune activation?",
    text: "Our earlier work asked how dendritic cells and macrophages translate microbial signals into coordinated gene programs. We identified a conserved enhancer lexicon that helps encode response timing and used SIP—our immunoprecipitation-coupled extension of SPRITE—to show how multiway enhancer–promoter hubs shape the strength and cell-to-cell consistency of gene activation. This regulatory framework now guides our studies of diseased skin.",
    image: "/assets/sprite-dc-schematic.webp",
    imageAlt: "Schematic of bone-marrow-derived dendritic cells stimulated over 4 and 24 hours, profiled by RNA-seq, H3K27ac ChIP-seq, ATAC-seq, and SPRITE, from Vangala et al. 2020",
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
    description: "With Divito: interrogating the clonal repertoire in drug hypersensitivity reactions.",
  },
    {
    name: "LEO Foundation",
    description: "To investigate the role of WARS1 as an alarmin that triggers CD14+ activation to initiate UV responses",
  },
];

export const storyPoints = [
  "CD14+ myeloid cells expand in photosensitive disease.",
  "Resident-like and inflammatory states form a continuum.",
  "Fibroblast and keratinocyte signals shape tissue recruitment.",
  "CD14+ cells also expand in other disedases and show disease specific state and spatial transitions",
];
