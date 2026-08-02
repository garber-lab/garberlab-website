export type LabPerson = {
  name: string;
  dates: string;
  role?: string;
  focus: string;
  image?: string;
};

export type PeopleGroup = {
  title: string;
  current: LabPerson[];
  alumni: LabPerson[];
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
  },
  {
    title: "Postdoctoral fellows",
    current: [],
    alumni: [],
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
    alumni: [],
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
    ],
    alumni: [],
  },
  {
    title: "Clinical and experimental collaborators",
    current: [],
    alumni: [],
  },
];
