export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  altText: string;
  createdAt: Date;
}

export interface CreateGalleryImageDto {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  altText: string;
}

export interface UpdateGalleryImageDto {
  title?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  altText?: string;
}