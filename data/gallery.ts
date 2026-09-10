export type GalleryPhoto = {
  image: string;
  caption: string;
  /** Free-form — "2018", "Commencement 2026", "Lab retreat, June 2026", etc. */
  date?: string;
};

// Add new photos anywhere in this list — newest first is the convention,
// but order here is exactly the display order (no auto-sorting).
export const galleryPhotos: GalleryPhoto[] = [];
