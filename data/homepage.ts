export type ResearchProgram = {
  eyebrow: string;
  title: string;
  text: string;
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

export const researchPrograms: ResearchProgram[] = [
  {
    eyebrow: "Human skin disease",
    title: "Regulatory programs in skin autoimmunity",
    text: "We study inflammatory skin diseases as human systems where genetic risk, environmental exposure, tissue injury, and immune memory can be measured together. Current projects span vitiligo, cutaneous lupus, dermatomyositis, psoriasis, and hidradenitis suppurativa.",
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
    eyebrow: "Perturbation",
    title: "From patient samples to causal models",
    text: "We combine clinical perturbations, UV exposure, cytokine stimulation, ex vivo skin experiments, and in vitro reconstruction to ask what inflammatory cells are responding to and which signals are causal.",
  },
  {
    eyebrow: "Genomes to mechanisms",
    title: "Comparative and functional genomics",
    text: "The lab's long-standing focus on gene regulation, noncoding sequence, evolutionary constraint, and regulatory modeling remains the engine underneath our disease work: how do genomes encode cellular responses, and how are those responses rewired in disease?",
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

export const storyPoints = [
  "CD14+ myeloid cells expand in photosensitive disease.",
  "Resident-like and inflammatory states form a continuum.",
  "Fibroblast and keratinocyte signals shape tissue recruitment.",
  "HS may reveal a distinct CCR2+ branch of the program.",
];
