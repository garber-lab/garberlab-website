Put lab pictures, commencement photos, retreats, etc. in this folder and
reference them from data/gallery.ts.

Example:

1. Add a file named `commencement-2026.jpg` here.
2. In `data/gallery.ts`, add an entry:
   ```
   {
     image: "/gallery/commencement-2026.jpg",
     caption: "Commencement, 2026",
   },
   ```

Landscape or square photos work best. No need to pre-crop or resize —
just drop the original file in and mention it; cropping/resizing for the
web happens when the entry is wired in.
