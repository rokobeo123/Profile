import fs from 'fs';
import path from 'path';
import { GalleryClient } from './GalleryClient';

export async function GalleryWidget() {
  let images: { src: string; alt: string }[] = [];
  
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    if (fs.existsSync(galleryDir)) {
      const files = await fs.promises.readdir(galleryDir);
      // Filter for image extensions and sort naturally
      const imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      
      images = imageFiles.map((file, idx) => ({
        src: `/gallery/${file}`,
        alt: `Gallery Image ${idx + 1}`
      }));
    }
  } catch (error) {
    console.error("Failed to read gallery directory", error);
  }

  // Fallback if no images found
  if (images.length === 0) {
    images = [
      { src: "/placeholder-1.jpg", alt: "Gallery Image 1" },
      { src: "/placeholder-2.jpg", alt: "Gallery Image 2" },
      { src: "/placeholder-3.jpg", alt: "Gallery Image 3" },
      { src: "/placeholder-4.jpg", alt: "Gallery Image 4" }
    ];
  }

  return <GalleryClient images={images} />;
}
