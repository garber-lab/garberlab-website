// The story of the UMass Chan Bioinformatics Core, founded by Manuel Garber in
// 2011. This is a FIRST DRAFT for Manuel and Alper Kucukural to react to.
//
// Prose supports the site's inline link syntax: [label](url).
//
// Open items to confirm before this goes live (search "TODO" below):
//  - TODO(four-biotechs): the four biotech licensees of DolphinNext (pre-Via)
//    are from Manuel's account; names intentionally omitted.
//  - TODO(via-closure): Via Scientific's early-2026 closure and the reason
//    given (LLM disruption) are from Manuel's account; no public source found.
//  - TODO(onur-now): Onur went to a small biotech after Via; Manuel will
//    supply the name/title later. His card has no "now" line until then.
//  - TODO(alper-title): Alper's current title for the reinvented core.

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
    "Manuel Garber founded the UMass Chan Bioinformatics Core in 2011 with a simple conviction: a core that builds its own infrastructure serves its users better than one that only assembles other people's. That conviction produced DEBrowser and DolphinNext, a company, and, after that company's run ended, a core being reinvented around AI. This is the story so far, told mostly through the two people who built most of it: Alper Kucukural and Onur Yukselen.",
};

export const coreChapters: CoreChapter[] = [
  {
    period: "2011",
    title: "A core with a do-it-yourself philosophy",
    paragraphs: [
      "When the core opened in 2011, sequencing was becoming routine at UMass Chan faster than the expertise to analyze it. From the start we took the view that the core should build the systems it runs on, understand every step of them, and keep improving them as if they were a product. That do-it-yourself philosophy is the thread running through everything that follows.",
    ],
  },
  {
    period: "The early years",
    title: "Hennady Shulha and a Perl-based core",
    paragraphs: [
      "Hennady Shulha ran the core's day-to-day analysis in its first years, working through a Perl-based web system he wrote himself to track samples and drive their processing. It was homegrown and it worked. One of the first substantial collaborations was with Roger Davis's lab in the Program in Molecular Medicine, analyzing sequencing data from mice with liver-specific disruption of the JNK stress-signaling pathway. That analysis became part of [Vernia et al., Cell Metabolism 2014](https://doi.org/10.1016/j.cmet.2014.06.010), which showed that hepatic JNK regulates metabolism through the PPARα–FGF21 hormone axis.",
    ],
  },
  {
    period: "Dolphin and DEBrowser",
    title: "Alper Kucukural builds the first platform",
    paragraphs: [
      "Alper Kucukural came to the core after several years working on RNA biology with Melissa Moore. He brought a software engineer's instincts to a bioinformatics problem. Rather than keep running samples through scripts, he built Dolphin, a pipeline manager with a web front end, designed to improve on [Galaxy](https://galaxyproject.org/), the web-based sample-processing platform developed at Penn State. Dolphin let a user submit samples, choose a pipeline, and get back tracked, reproducible results, and it became the core's production system.",
      "The analysis end of the workflow got the same treatment. Differential expression results were being handed to biologists as tables. Alper, with Onur Yukselen and Deniz Ozata, wrote [DEBrowser](https://doi.org/10.1186/s12864-018-5362-x), an interactive tool for exploring count data: quality control, differential expression, and visualization in one browser session, with no code required. DEBrowser was released through Bioconductor and remains one of the core's most widely used tools.",
    ],
  },
  {
    period: "DolphinNext",
    title: "Onur Yukselen and the second generation",
    paragraphs: [
      "Onur Yukselen joined the core as Dolphin was reaching the limits of its design. Pipelines were hard-coded, and moving them between the campus cluster and other environments meant rewriting them. Onur and Alper rebuilt the platform from the ground up as [DolphinNext](https://doi.org/10.1186/s12864-020-6714-x), with Onur as lead developer and first author. DolphinNext sits on top of Nextflow: users assemble pipelines by dragging and dropping processes, every pipeline and every process is version-controlled, and the same pipeline runs unchanged on an HPC scheduler, in the cloud, or on a workstation. Results flow directly into an embedded DEBrowser.",
      "DolphinNext was built for the range of people a core actually serves, from bench biologists who want to run a standard RNA-seq pipeline to bioinformaticians who want to write their own. It is still the pipeline designer and runner behind the Garber lab's own work.",
    ],
  },
  {
    period: "2023",
    title: "From licensing to Via Scientific",
    paragraphs: [
      "The platform did not stay on campus. UMass Chan licensed DolphinNext itself to four biotech companies, the first sign that what the core had built for itself was useful well beyond it. In early 2023 the technology was licensed to a new company, Via Scientific, founded to commercialize it as Via Foundry. Alper became Via's chief technology officer, Melissa Moore joined as a co-founder and early backer, and Jim Crowley, a technology and AI entrepreneur, became its chief executive. The company closed a $5 million seed round the following January.",
      "Manuel was among the founders, and that created a conflict of interest with running a university core whose technology the company now held. He resigned as core director in 2023 for that reason.",
    ],
  },
  {
    period: "2026",
    title: "A closing, and a reinvented core",
    paragraphs: [
      "Via Scientific wound down in early 2026. The product it sold let scientists build and run analysis pipelines without writing code. Within three years of its launch, large language models could write that code directly, and the space the company had been built for was disrupted underneath it.",
      "Alper has since returned to UMass Chan to lead a reinvented core, one that treats AI as its primary tool rather than as a threat to the old ones. It is the same do-it-yourself philosophy the core started with in 2011, applied to a different generation of technology: build the systems, understand every step, and keep improving them.",
    ],
  },
];

export const corePeople: CorePerson[] = [
  {
    name: "Alper Kucukural",
    role: "Built Dolphin, DEBrowser, and DolphinNext; now leads the core",
    bio: "Alper led the core's platform development from Dolphin through DolphinNext, co-founded Via Scientific as its chief technology officer, and returned to UMass Chan to lead the core's AI-focused reinvention.",
    image: "/people/alper_kucukural.jpg",
    link: "https://alper.kucukural.com/",
    linkLabel: "alper.kucukural.com ↗",
  },
  {
    name: "Onur Yukselen",
    role: "Lead developer of DolphinNext",
    bio: "Onur was the lead developer and first author of [DolphinNext](https://doi.org/10.1186/s12864-020-6714-x) and a co-author of [DEBrowser](https://doi.org/10.1186/s12864-018-5362-x), and built much of the platform that the core, and later Via Scientific, ran on.",
    image: "/people/onur_yukselen.jpg",
  },
];
