export type GalleryPhoto = {
  image: string;
  caption: string;
  /** Free-form — "2018", "Commencement 2026", "Lab retreat, June 2026", etc. */
  date?: string;
};

// Add new photos anywhere in this list — newest first is the convention,
// but order here is exactly the display order (no auto-sorting).
export const galleryPhotos: GalleryPhoto[] = [
  {
    image: "/gallery/mglab001.jpg",
    caption:
      "2018 Lab picture outside the Albert Sherman Building, from left to right: Manuel, Elisa, Pranitha, Alper, Patrick, Rachel, Alan, Onur and Yuming",
    date: "2018",
  },
  {
    image: "/gallery/mglab002.jpg",
    caption:
      "The same group, the same day, in the old laboratory — before the lab moved to the 5th floor",
    date: "2018",
  },
  {
    image: "/gallery/alan-indrop-2016.jpg",
    caption: "Alan tweaking the microfluidics chamber on the inDrop setup",
    date: "2016",
  },
  {
    image: "/gallery/GCB_Faculty_Staff_and_Students_at_Research_Retreat.jpg",
    caption: "GCB Attendees to the 2023 Umass Chan Retreat at Umass Amherst",
    date: "Oct 2023"
  },
  {
    image: "/gallery/buzzards-bay-swim-2026.jpg",
    caption:
      "Buzzards Bay Swim 2026: Lucio, Nazgol, Said and Khashi (the one not in a wetsuit) joined Manuel and Chad again this year. Said was a dermatology postdoc at UMass Chan before starting his residency, and Khashi and Nazgol were postdocs with Mehdi Rashighi",
    date: "2026",
  },
  {
    image: "/gallery/buzzards-bay-swim-2025.jpg",
    caption:
      "Buzzards Bay Swim 2025, from left to right: Said; Nazgol, a postdoc with Manuel's close collaborator Mehdi Rashighi; Lucio Castilla, UMass Chan colleague and swimming buddy; Nicole Rhind, who swims and hosts everyone the night before; Manuel's daughter Adriana, in front of her; Chad; Manuel; Larry Stern, another UMass Chan colleague; and Nicole Shedd, a graduate student in Zhiping Weng's lab",
    date: "2025",
  },
  {
    image: "/gallery/buzzards-bay-swim-2018.jpg",
    caption:
      "Alper, Chad Nusbaum, Manuel, Alan and Elisa at the 2018 Buzzards Bay Swim. Manuel and Chad have swum it every year since 2012, and lab members join once in a while",
    date: "2018",
  },
];
