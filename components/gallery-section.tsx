import { galleryPhotos } from "../data/gallery";

export function GallerySection() {
  return (
    <section className="section-shell gallery" id="gallery">
      <div className="gallery-intro">
        <p className="kicker">Gallery</p>
        <h1>Life in the lab</h1>
        <p>Lab pictures, retreats, commencements, and other moments along the way.</p>
      </div>
      {galleryPhotos.length > 0 ? (
        <div className="gallery-grid">
          {galleryPhotos.map((photo) => (
            <figure className="gallery-photo" key={photo.image}>
              <img src={photo.image} alt={photo.caption} />
              <figcaption>
                {photo.caption}
                {photo.date ? <span className="gallery-photo-date"> — {photo.date}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="gallery-empty">Add photos in the gallery data file.</div>
      )}
    </section>
  );
}
