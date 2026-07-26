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
    current: [],
    alumni: [],
  },
  {
    title: "Computational scientists and research staff",
    current: [],
    alumni: [],
  },
  {
    title: "Clinical and experimental collaborators",
    current: [],
    alumni: [],
  },
];
