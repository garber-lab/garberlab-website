import type { Metadata } from "next";
import { GallerySection } from "../../components/gallery-section";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Lab pictures, retreats, commencements, and other moments from the Garber Lab.",
};

export default function GalleryPage() {
  return (
    <main>
      <GallerySection />
    </main>
  );
}
