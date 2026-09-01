export type ResourceLink = {
  label: string;
  url: string;
};

export type Resource = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** The main thing to click. */
  primary: ResourceLink;
  /** Additional hosted sites or browsers for the same resource. */
  links?: ResourceLink[];
  code?: ResourceLink[];
  data?: ResourceLink[];
  paper: {
    citation: string;
    url: string;
  };
};

export const resourcesIntro =
  "Interactive portals and software from the lab. Each one is tied to a paper, and the code is open so you can run it on your own data.";

export const resources: Resource[] = [
  {
    id: "skin-omics-explorer",
    name: "Skin Omics Explorer",
    tagline: "Multi-omics portal for photosensitive autoimmunity",
    description:
      "An interactive portal for exploring multi-omics datasets across autoimmune skin diseases and UV perturbation models. Browse single-cell RNA-seq, spatial transcriptomics (seqFISH), bulk RNA-seq, and targeted proteomics (OLINK and NULISA) in dermatomyositis, cutaneous lupus erythematosus, psoriasis, and vitiligo, and visualize gene and protein expression across cell types, skin states, and treatments. Plots mirror those in the paper and export to PNG or PDF.",
    primary: {
      label: "cd14photosensitivity.umassmed.edu",
      url: "https://cd14photosensitivity.umassmed.edu/",
    },
    code: [
      {
        label: "SkinOmicsExplorer",
        url: "https://github.com/garber-lab/SkinOmicsExplorer",
      },
      { label: "scSpatial", url: "https://github.com/garber-lab/scSpatial" },
      { label: "AddOns", url: "https://github.com/garber-lab/AddOns" },
    ],
    paper: {
      citation:
        "Wang Y, Afshari K, Haddadi N-S, Salomão Lopes C, et al. A spatially coordinated keratinocyte-fibroblast circuit recruits MMP9+ myeloid cells to drive IFN-I-driven inflammation in photosensitive autoimmunity. Nature Immunology 27, 1184-1196 (2026).",
      url: "https://doi.org/10.1038/s41590-026-02502-w",
    },
  },
  {
    id: "vitiligo-portal",
    name: "Vitiligo single-cell portal",
    tagline: "scRNA-seq of lesional and non-lesional vitiligo skin",
    description:
      "Single-cell RNA-seq profiles of affected and unaffected skin from vitiligo patients and healthy controls, generated on our in-house inDrop platform. The site hosts a Cellxgene browser over the processed data, plus raw and processed UMI tables, and documents the cell-cell communication analysis that identified disrupted signaling in non-lesional skin and a role for CCR5 in regulatory T cell function.",
    primary: {
      label: "vitiligo.dolphinnext.com",
      url: "https://vitiligo.dolphinnext.com/",
    },
    links: [
      {
        label: "Cellxgene browser",
        url: "https://vitiligo.dolphinnext.com/browse.html",
      },
    ],
    code: [
      {
        label: "SignallingSingleCell",
        url: "https://github.com/garber-lab/SignallingSingleCell",
      },
    ],
    data: [
      {
        label: "dbGaP phs002455.v1.p1 (raw FASTQ)",
        url: "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002455.v1.p1",
      },
      {
        label: "Processed UMI tables",
        url: "https://vitiligo.dolphinnext.com/index.html",
      },
    ],
    paper: {
      citation:
        "Gellatly KJ, et al. scRNA-seq of human vitiligo reveals complex networks of subclinical immune activation and a role for CCR5 in Treg function. Science Translational Medicine (2021).",
      url: "https://doi.org/10.1126/scitranslmed.abd8995",
    },
  },
  {
    id: "slncky",
    name: "slncky",
    tagline: "lncRNA discovery and evolutionary analysis",
    description:
      "A tool that filters a high-confidence set of long noncoding RNAs from reconstructed RNA-seq data and finds conserved lncRNAs using a sensitive noncoding alignment method. The companion Evolution Browser hosts alignments and evolutionary metrics for our catalog of conserved lncRNAs, searchable by name or genomic location, with hg38 and mm10 annotations. Developed with the Regev Lab at the Broad Institute.",
    primary: { label: "slncky.github.io", url: "https://slncky.github.io/" },
    links: [
      {
        label: "slncky Evolution Browser",
        url: "https://slncky.umassmed.edu/",
      },
    ],
    code: [{ label: "slncky", url: "https://github.com/slncky/slncky" }],
    paper: {
      citation:
        "Chen J, Shishkin AA, Zhu X, et al. Evolutionary analysis across mammals reveals distinct classes of long non-coding RNAs. Genome Biology 17, 19 (2016).",
      url: "https://doi.org/10.1186/s13059-016-0880-9",
    },
  },
];
