export interface ImageGallery {
  imageGalleryId: number;
  galleryName: string | null;
  galleryPath: string | null;
}

export interface ImageGalleryResponse {
  records: ImageGallery[];
  totalRecords: number;
}
