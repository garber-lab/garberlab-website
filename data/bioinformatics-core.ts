// The story of the UMass Chan Bioinformatics Core, founded by Manuel Garber in
// 2011.
//
// Prose supports the site's inline link syntax: [label](url).
//
// The five biotech and pharma companies that licensed DolphinNext before Via
// Scientific are deliberately left unnamed.

export type CoreChapter = {
  period: string;
  title: string;
  paragraphs: string[];
};

export type CorePerson = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  link?: string;
  linkLabel?: string;
};

export const coreIntro = {
  kicker: "Bioinformatics Core",
  title: "Fifteen years of building our own tools",
  lead:
    "Manuel Garber founded the UMass Chan Bioinformatics Core in 2011 with a simple conviction: a core that builds its own infrastructure serves its users better than one that only assembles other people's. That conviction produced DEBrowser and DolphinNext, and then a company built on both. Fifteen years later the core is reinventing itself around AI, on the same conviction. This is the story so far, told mostly through the two people who built most of it: Alper Kucukural and Onur Yukselen.",
};

export const coreChapters: CoreChapter[] = [
  {
    period: "2011",
    title: "A core with a do-it-yourself philosophy",
    paragraphs: [
      "When the core opened in 2011, sequencing was becoming routine at UMass Chan faster than the expertise to analyze it. From the start the core's remit was to build the systems it ran on, understand every step of them, and keep improving them as if they were a product rather than a service.",
    ],
  },
  {
    period: "2011 to 2013",
    title: "Hennady Shulha and a Perl-based core",
    paragraphs: [
      "Hennady Shulha ran the core's day-to-day analysis in its first years, working through a Perl-based web system he wrote himself to track samples and drive their processing. It was homegrown and it worked. One of the first substantial collaborations was with Roger Davis's lab in the Program in Molecular Medicine, analyzing sequencing data from mice with liver-specific disruption of the JNK stress-signaling pathway. That analysis became part of [Vernia et al., Cell Metabolism 2014](https://doi.org/10.1016/j.cmet.2014.06.010), which showed that hepatic JNK regulates metabolism through the PPARα–FGF21 hormone axis.",
    ],
  },
  {
    period: "2013 to 2016",
    title: "Alper Kucukural builds the first platform",
    paragraphs: [
      "Alper Kucukural joined the core in 2013, after several years working on RNA biology in Melissa Moore's lab at UMass Chan. His training ran from a BS in mathematics engineering through an MS in systems analysis to a PhD in biological sciences and bioengineering, and he treated the core's problem as an engineering one. Rather than keep running samples through scripts, he built Dolphin, a pipeline manager with a web front end in the spirit of [Galaxy](https://galaxyproject.org/) but shaped around the way this core actually worked: a user submitted samples, chose a pipeline, and got back tracked, reproducible results. Dolphin went into production in 2015 as the core's main system.",
      "The analysis end of the workflow got the same treatment. Differential expression results were being handed to biologists as tables. Alper and Onur Yukselen wrote [DEBrowser](https://doi.org/10.1186/s12864-018-5362-x), an interactive tool for exploring count data: quality control, differential expression, and visualization in one browser session, with no code required. It was released through Bioconductor in March 2016 and is still one of the core's most widely used tools.",
    ],
  },
  {
    period: "2016 to 2022",
    title: "Onur Yukselen and the second generation",
    paragraphs: [
      "Onur Yukselen joined the core in 2016, as Dolphin was reaching the limits of its design. Pipelines were hard-coded, and moving them between the campus cluster and other environments meant rewriting them. Onur and Alper rebuilt the platform from the ground up as [DolphinNext](https://doi.org/10.1186/s12864-020-6714-x), with Onur as lead developer and first author. DolphinNext sits on top of Nextflow: users assemble pipelines by dragging and dropping processes, every pipeline and every process is version-controlled, and the same pipeline runs unchanged on an HPC scheduler, in the cloud, or on a workstation. Results flow directly into an embedded DEBrowser. It was in production before the end of the year.",
      "DolphinNext was built for the range of people a core actually serves, from bench biologists who want to run a standard RNA-seq pipeline to bioinformaticians who want to write their own. For the next six years it was the system the core ran on, developed continuously alongside the projects it served.",
    ],
  },
  {
    period: "2023",
    title: "From licensing to Via Scientific",
    paragraphs: [
      "The platform did not stay on campus. UMass Chan licensed DolphinNext to five biotech and pharma companies, the first sign that what the core had built for itself was useful well beyond it. In early 2023 the technology was licensed to a new company, Via Scientific, founded to commercialize it as Via Foundry. Alper became Via's chief technology officer, and Jim Crowley, a technology and AI entrepreneur, became its chief executive. Melissa Moore, who had left UMass Chan for Moderna in 2016, joined as a co-founder and early backer. The company closed a $5 million seed round in January 2024.",
      "Manuel was among the founders, and that created a conflict of interest with running a university core whose technology the company now held. He resigned as core director in 2023 for that reason. Ozkan Aydemir ran the core from then until 2026.",
    ],
  },
  {
    period: "2026",
    title: "A closing, and a reinvented core",
    paragraphs: [
      "Via Scientific wound down in early 2026, three years after it launched.",
      "The lesson the core took from it is that writing the code was never the hard part. A language model will produce a pipeline script on demand. Running it reproducibly, tracking where every number came from, and handing a biologist an answer they can act on is still real work, and it is work a core is unusually well placed to do.",
      "Alper has since returned to UMass Chan and now co-directs the core with Ozkan Aydemir, with Manuel as an advisor. The brief is the one the core started with in 2011, applied to a different generation of technology: build the systems, understand every step, and keep improving them.",
    ],
  },
];

export const corePeople: CorePerson[] = [
  {
    name: "Alper Kucukural",
    role: "Associate Professor; Co-Director of the Bioinformatics Core",
    bio: "Alper led the core's platform development from Dolphin through DolphinNext, co-founded Via Scientific as its chief technology officer, and returned to UMass Chan to co-direct the core and lead its AI-focused reinvention.",
    image: "/people/alper_kucukural.jpg",
    link: "https://alper.kucukural.com/",
    linkLabel: "alper.kucukural.com ↗",
  },
  {
    name: "Onur Yukselen",
    role: "Lead developer of DolphinNext",
    bio: "Onur was the lead developer and first author of [DolphinNext](https://doi.org/10.1186/s12864-020-6714-x) and a co-author of [DEBrowser](https://doi.org/10.1186/s12864-018-5362-x), and built much of the platform that the core, and later Via Scientific, ran on. He is now Senior Bioinformatics Platform Engineer at Singular Genomics.",
    image: "/people/onur_yukselen.jpg",
  },
];

export const coreToday = {
  period: "Today",
  title: "Working with the core",
  intro:
    "The core works with labs at UMass Chan across the whole arc of a sequencing project, and it still builds the systems it runs on.",
  services: [
    "Consultation on study design, before the sequencing rather than after it.",
    "Standard analyses: bulk RNA-seq, single cell, ATAC, ChIP, and variant calling.",
    "Custom pipeline development, run reproducibly on the campus cluster.",
    "AI-assisted analysis and reporting.",
    "Training and workshops.",
  ],
  contactLead: "To start a project, email the core at",
  email: "biocore@umassme.edu",
};
