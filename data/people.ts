export type LabPerson = {
  name: string;
  dates: string;
  role?: string;
  focus: string;
  image?: string;
  // "Where are they now" fields, mainly for alumni.
  currentRole?: string;
  institution?: string;
  workingOn?: string;
  link?: string;
  linkLabel?: string;
};

export type PeopleGroup = {
  title: string;
  current: LabPerson[];
  alumni: LabPerson[];
  // The PI group has exactly one person and never has alumni.
  hideAlumni?: boolean;
};

export type InMemoriam = {
  name: string;
  dates: string;
  tribute: string[];
  image?: string;
};

export const inMemoriam: InMemoriam = {
  name: "Patrick McDonel",
  dates: "1977–2023",
  image: "/people/Patrick_mcdonel.jpg",
  tribute: [
    "Patrick passed away on November 19, 2023. The Garber lab owes much of the things we do to him. He established our molecular biology operation and instilled its philosophy.",
    "It was not only in science that Patrick knew what was important. He kept everyone in touch — whether it was his Christmas gathering for non-Christians, an overnight smoking affair, or just cocktails, it was always at Patrick's house that we'd end up seeing people the rest of us hadn't made the time to seek out ourselves. He is sorely missed, and we keep his memory with us.",
  ],
};

export const peopleGroups: PeopleGroup[] = [
  {
    title: "Principal investigator",
    current: [
      {
        name: "Manuel Garber",
        dates: "2011-present",
        role: "Principal investigator",
        focus:
          "Systems immunology, regulatory genomics, and computational models of human inflammatory disease.",
        image: "/people/Manuel_Garber.png",
      },
    ],
    alumni: [],
    hideAlumni: true,
  },
  {
    title: "Lab administration",
    current: [
      {
        name: "Heidi Beberman",
        dates: "2013-present",
        role: "Department Financial Administrator",
        focus:
          "Heidi is the department's financial administrator, and the person who keeps this lab running. She manages our finances and grants, listens to everyone, and always finds a way to help.",
        image: "/people/Heidi_Beberman.jpg",
      },
    ],
    alumni: [],
    hideAlumni: true,
  },
  {
    title: "Graduate students",
    current: [
      {
        name: "Shuo Shan",
        dates: "2020-present",
        role: "Graduate Student",
        focus:
          "I map expression and response QTLs (reQTLs) in human skin cells to understand how genetic variants shape cytokine responses. My work combines eQTL and reQTL mapping with chromatin accessibility data and sequence-based deep learning models to identify variants that alter regulatory DNA elements and transcription factor binding.",
        image: "/people/crystal_shuo_shan.jpg",
      },
      {
        name: "Wei-Che Ko",
        dates: "2022-present",
        role: "Millennium Program PhD Student",
        focus:
          "I am a board-certified dermatologist with subspecialty expertise in allergic contact dermatitis. In the clinic, I perform patch testing to identify the specific allergens driving a patient's skin disease. In my research, I combine clinical sampling with single-cell approaches and computational methods to define allergen-specific molecular signatures and dissect the immune mechanisms underlying contact allergy.",
        image: "/people/wei-che_ko.jpg",
      },
    ],
    alumni: [
      {
        name: "Yuqing Wang",
        dates: "March 2019 - June 2026",
        role: "Graduate Student and Postdoctoral Fellow",
        focus: "Investigating the molecular mechanisms of photosensitivity in autoimmune skin diseases, including dermatomyositis and cutaneous lupus erythematosus (CLE), through integrated multi-omics analyses encompassing single-cell RNA sequencing (scRNA-seq), proteomics, and spatial transcriptomics.",
        currentRole: "Bioinformatics Scientist",
        institution: "New England Biolabs, Inc.",
        workingOn: "Enzyme characterization using NGS, pipeline development and automation.",
        image: "/people/yuqing_wang.jpg",
      },
      {
        name: "Yuming Cao",
        dates: "Sept 2018 - May 2025",
        role: "Graduate Student and Postdoctoral Fellow",
        focus: "Investigated host-virus dynamics at single cell resolution in primary human cells.",
        currentRole: "Computational Scientist",
        institution: "Broad Institute of MIT and Harvard",
        workingOn: "Computational tool development for large-scale single cell Perturb-seq screens",
        image: "/people/yuming_cao.jpg"
      },
      {
        name: "Jake Gellatly",
        dates: "March 2016 - May 2021",
        role: "Graduate Student",
        // NOTE: old lab site lists him as "Kyle (Jake) Gellatly"
        focus:
          "With Patrick and Alan, I set up the lab's in-house inDrop system, and I developed the first single-cell analysis pipeline the lab used. During my PhD I focused on leveraging early single-cell blister biopsy data to identify the cell circuits underlying disease, leading the lab's first single-cell study of human vitiligo. That work laid the basis for all of the lab's skin autoimmunity projects since.",
        // Placeholder crop from the 2018 lab photo (gallery/mglab001.jpg); replace with the
        // photo Jake is sending (Sep 2026).
        image: "/people/jake_gellatly.jpg",
        currentRole: "Director of Product",
        institution: "FoxyAI, an AI real estate company",
        workingOn: "Applying vision-language models to solve problems for FoxyAI's customers",
        link: "https://foxyai.com",
        linkLabel: "foxyai.com ↗",
      },
      {
        name: "Pranitha Vangala",
        dates: "Sept 2014 - May 2020",
        role: "Graduate Student and Postdoctoral Fellow",
        focus:
          "Role of cis-regulatory elements in transcriptional regulation integrating evolutionary approaches, 4D interaction data and chromatin activity maps",
        currentRole: "Computational Biologist",
        institution: "Takeda Pharmaceuticals",
        workingOn: "Biomarkers and translational data science for gastro-intestinal and inflammatory diseases",
        image: "/people/pranitha-vangala.png",
      },
      {
        name: "Shaked Afik",
        dates: "2012-2013",
        role: "Visiting Graduate Student",
        // Consortium confirmed by Manuel (Sep 2026): the Human Islet Research Network (HIRN),
        // NIDDK UC4 DK104218 (Greiner). The paper was also funded under U01 DK089572.
        focus:
          "I worked on type 1 diabetes, analyzing RNA-seq of highly purified human adult and fetal islet alpha and beta cells with the Harlan and Greiner labs as part of the Human Islet Research Network (HIRN) effort. I also developed methods for 3' end RNA-seq analysis, defining transcription start and polyadenylation sites genome-wide. I went on to Nir Yosef's lab at UC Berkeley as a PhD student.",
        // Photo available on the old site:
        // umassmed.edu/globalassets/garber-lab/images/alumni/shaked.affik.png
        // image: "/people/shaked-afik.jpg",
      },
    ],
  },
  {
    title: "Postdoctoral fellows",
    current: [],
    alumni: [
      {
        name: "Khashayar Afshari",
        dates: "May 2020 - June 2025",
        role: "Joint Postdoctoral Fellow with Mehdi Rashighi",
        focus: "Immunology of autoimmune and inflammatory skin diseases, with a focus on disease mechanisms and the interplay between innate and adaptive immunity, particularly the role of myeloid cells. Studied the molecular mechanisms of photosensitivity in dermatomyositis and cutaneous lupus erythematosus (CLE), through integrated multi-omics analyses encompassing single-cell RNA sequencing (scRNA-seq), proteomics, and spatial transcriptomics, using mechanistic clinical trials as well as in vitro and ex vivo mechanistic studies in human cells and tissue.",
        currentRole: "Scientist",
        institution: "Dr. Phillip Frost Department of Dermatology and Cutaneous Surgery, University of Miami Miller School of Medicine",
        workingOn: "Developing and applying multi-omic approaches to advance precision medicine in translational dermatology.",
        image: "/people/khashi_afshari.jpg",
      },
      {
        name: "Elisa Donnard",
        dates: "2014-2020",
        role: "Postdoctoral Fellow",
        focus:
          "Single-cell and comparative genomics approaches to dissect transcriptional and post-transcriptional regulatory programs across diverse tissues. A particular focus was Fragile X syndrome, showing how loss of the FMRP protein leads to cell-type-specific transcriptional changes in mouse brain, and is linked to mRNA stability.",
        currentRole: "Group Leader / Principal Investigator",
        institution: "Broad Institute / Novo Nordisk Foundation Center for Genomic Mechanisms of Disease",
        workingOn:
          "Functional genomics and gene regulation in metabolic disease-relevant cell models, using cell villages and large-scale Perturb-seq screens",
        image: "/people/Elisa-Donnard.jpg",
      },
      {
        name: "Xiaopeng Zhu",
        dates: "",
        role: "Postdoctoral Fellow",
        focus: "",
        institution: "Jian Ma Lab, University of Pittsburgh",
      },
    ],
  },
  {
    title: "Computational scientists and research staff",
    current: [
      {
        name: "Carolina Salomao Lopes",
        dates: "2019-present",
        role: "Senior Scientist",
        focus:
          "I systematically stimulate skin stromal, mesenchymal, and immune cells with defined cytokines to map their precise responses. I use these response maps to identify the key signaling forces driving inflammation in autoimmune skin disease.",
        image: "/people/carolina-salomao-lopes.jpg",
      },
      {
        name: "Thomas Jacob",
        dates: "2023-present",
        role: "Bioinformatician",
        focus:
          "I am the bioinformatician and data scientist for the VIGOR study, a longitudinal vitiligo family study aimed at identifying the genetic and environmental causes of the disease. I build and maintain computational workflows to harmonize study data, derive insights from complex genomic datasets, integrate wearable biometrics (e.g., Fitbit data), and manage the cohort across platforms. My current focus is developing pipelines to evaluate genomic risk scores in the VIGOR cohort to better understand how a person's genome influences vitiligo onset.",
        image: "/people/thomas_jacob.jpg",
      },
      {
        name: "Sandhiya Ravi",
        dates: "2026-present",
        role: "Computational Biologist",
        focus:
          "I apply computational and AI/ML approaches to analyze single-cell and spatial transcriptomic data. My current work includes developing gene-expression scoring methods and studying cellular responses and states in inflammatory skin diseases.",
        image: "/people/Sandhiya_ravi.png",
      },
    ],
    alumni: [
      {
        name: "Alan Derr",
        dates: "",
        role: "Computational Biologist",
        focus:
          "I developed the [End Sequence Analysis Toolkit (ESAT)](https://doi.org/10.1101/gr.207902.116), which extracts additional information from single-cell RNA-seq data through 3' end sequencing, and built it into the core of the lab's single-cell analysis pipeline.",
        image: "/people/alan_derr.jpeg",
        currentRole: "Retired",
        institution: "",
        workingOn:
          "Traveling the world, biking, cooking, and designing jewelry, and combining traveling and biking as much as possible",
      },
      {
        name: "Narayan Sadagopan",
        dates: "",
        role: "Bioinformatician",
        focus: "",
        // Photo available on the old site:
        // umassmed.edu/globalassets/garber-lab/images/alumni/narayan.jpg
        // image: "/people/narayan-sadagopan.jpg",
      },
      {
        name: "Rachel Murphy",
        dates: "",
        role: "Research Technician",
        focus: "Joined the lab as a technician right after graduating from WPI.",
      },
    ],
  },
  {
    title: "Clinical and experimental collaborators",
    current: [
      {
        name: "Thomas Fazzio",
        dates: "",
        role: "Collaborator",
        focus: "",
        institution: "UMass Chan Medical School",
        link: "https://www.umassmed.edu/mccb/faculty-MCCB/faculty-MCCB/faculty-profile-pages/fazzio-thomas/",
      },
      {
        name: "Stefania Gallucci",
        dates: "",
        role: "Collaborator",
        focus: "",
        institution: "UMass Chan Medical School",
        link: "https://profiles.umassmed.edu/display/31044994",
      },
      {
        name: "Sarah Whitley",
        dates: "",
        role: "Collaborator",
        focus: "",
        institution: "UMass Chan Medical School",
        link: "https://www.umassmed.edu/aiti/team/dr.-sarah-whitley",
      },
      {
        name: "Mehdi Rashighi",
        dates: "",
        role: "Collaborator",
        focus: "",
        institution: "Mass General Brigham",
        link: "https://doctors.massgeneralbrigham.org/provider/mehdi-rashighi-firoozabadi/7190611",
      },
    ],
    alumni: [],
    hideAlumni: true,
  },
];
