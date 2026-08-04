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
};

export type PeopleGroup = {
  title: string;
  current: LabPerson[];
  alumni: LabPerson[];
  // The PI group has exactly one person and never has alumni.
  hideAlumni?: boolean;
};

export const peopleGroups: PeopleGroup[] = [
  {
    title: "Principal investigator",
    current: [
      {
        name: "Manuel Garber",
        dates: "2009-present",
        role: "Principal investigator",
        focus:
          "Systems immunology, regulatory genomics, and computational models of human inflammatory disease.",
        // Add a photo to public/people/manuel-garber.jpg, then uncomment:
        // image: "/people/manuel-garber.jpg",
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
    ],
    alumni: [
      {
        name: "Pranitha Vangala",
        dates: "Sept 2014 - May 2020",
        role: "Graduate Student",
        focus:
          "Role of cis-regulatory elements in transcriptional regulation integrating evolutionary approaches, 4D interaction data and chromatin activity maps",
        currentRole: "Computational Biologist",
        institution: "Takeda Pharmaceuticals",
        workingOn: "Biomarkers and translational data science for gastro-intestinal and inflammatory diseases",
        image: "/people/pranitha-vangala.png",
      },
      {
        name: "Yuming Cao",
        dates: "Sept 2018- May 2024",
        role: "Graduate Student",
        focus: "Investigated host-virus dynamics at single cell resolution in primary human cells.",
        currentRole: "Computational Scientist",
        institution: "Broad Institute of MIT and Harvard",
        workingOn: "Computational tool development for large-scale single cell Perturb-seq screens",
      },
      {
        name: "Yuqing Wang",
        dates: "",
        role: "Graduate Student",
        focus: "",
        institution: "New England Biolabs (NEB)",
      },
      {
        name: "Jake Gellatly",
        dates: "",
        role: "Graduate Student",
        focus: "",
      },
    ],
  },
  {
    title: "Postdoctoral fellows",
    current: [],
    alumni: [
      {
        name: "Elisa Donnard",
        dates: "",
        role: "Postdoctoral Fellow",
        focus: "",
        institution: "Broad Institute",
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
        name: "Sandhiya Ravi",
        dates: "2026-present",
        role: "Computational Biologist",
        focus:
          "I apply computational and AI/ML approaches to analyze single-cell and spatial transcriptomic data. My current work includes developing gene-expression scoring methods and studying cellular responses and states in inflammatory skin diseases. (",
        image: "/people/Sandhiya_ravi.png",
      },
    ],
    alumni: [
      {
        name: "Alan Derr",
        dates: "",
        role: "Computational Biologist",
        focus: "",
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
