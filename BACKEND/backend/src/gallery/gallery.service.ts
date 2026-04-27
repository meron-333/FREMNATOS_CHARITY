import { Injectable, NotFoundException } from '@nestjs/common';
import { GalleryImage, CreateGalleryImageDto, UpdateGalleryImageDto } from './gallery.types';

@Injectable()
export class GalleryService {
  private galleryImages: GalleryImage[] = [
    {
      id: '1',
      title: 'Children Playing in Garden',
      description: 'Happy children enjoying outdoor activities in our garden.',
      imageUrl: '/images/gallery/children-garden.jpg',
      category: 'Children',
      altText: 'Children playing in garden',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Elderly Care Session',
      description: 'Elderly residents participating in recreational therapy.',
      imageUrl: '/images/gallery/elderly-session.jpg',
      category: 'Elderly',
      altText: 'Elderly care session',
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      title: 'Volunteer Team',
      description: 'Our dedicated volunteer team during training.',
      imageUrl: '/images/gallery/volunteer-team.jpg',
      category: 'Volunteers',
      altText: 'Volunteer team',
      createdAt: new Date('2024-02-15'),
    },
    {
      id: '4',
      title: 'Medical Checkup',
      description: 'Healthcare professionals conducting regular checkups.',
      imageUrl: '/images/gallery/medical-checkup.jpg',
      category: 'Healthcare',
      altText: 'Medical checkup',
      createdAt: new Date('2024-03-01'),
    },
  ];

  private generateId(): string {
    return (this.galleryImages.length + 1).toString();
  }

  findAll(category?: string): GalleryImage[] {
    if (category) {
      return this.galleryImages.filter((img) => img.category === category);
    }
    return this.galleryImages;
  }

  findOne(id: string): GalleryImage {
    const image = this.galleryImages.find((img) => img.id === id);
    if (!image) {
      throw new NotFoundException(`Gallery image with ID ${id} not found`);
    }
    return image;
  }

  create(createDto: CreateGalleryImageDto): GalleryImage {
    const newImage: GalleryImage = {
      id: this.generateId(),
      createdAt: new Date(),
      ...createDto,
    };
    this.galleryImages.push(newImage);
    return newImage;
  }

  update(id: string, updateDto: UpdateGalleryImageDto): GalleryImage {
    const index = this.galleryImages.findIndex((img) => img.id === id);
    if (index === -1) {
      throw new NotFoundException(`Gallery image with ID ${id} not found`);
    }
    this.galleryImages[index] = {
      ...this.galleryImages[index],
      ...updateDto,
    };
    return this.galleryImages[index];
  }

  remove(id: string): void {
    const index = this.galleryImages.findIndex((img) => img.id === id);
    if (index === -1) {
      throw new NotFoundException(`Gallery image with ID ${id} not found`);
    }
    this.galleryImages.splice(index, 1);
  }
}