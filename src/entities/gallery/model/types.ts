export interface GalleryImage {
  url: string;
  createdAt: string;
}

export interface GalleryPage {
  nextCursor?: string;
  images: GalleryImage[];
}
