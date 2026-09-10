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
    caption: "GCB Attendees to the 2024 Umass Chan Retreat at Umass Amherst",
    date: "Oct 2016"
  }
];
