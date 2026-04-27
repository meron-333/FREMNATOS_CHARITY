import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsEvent, CreateNewsEventDto, UpdateNewsEventDto } from './news-events.types';

@Injectable()
export class NewsEventsService {
  private newsEvents: NewsEvent[] = [
    {
      id: '1',
      title: 'Annual Charity Gala 2024',
      slug: 'annual-charity-gala-2024',
      summary: 'Join us for our annual fundraising gala to support our programs.',
      content: 'We are excited to announce our annual charity gala...',
      imageUrl: '/images/news/gala.jpg',
      type: 'event',
      eventDate: new Date('2024-12-15'),
      status: 'published',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: '2',
      title: 'New Elderly Care Center Opens',
      slug: 'new-elderly-care-center-opens',
      summary: 'Our new elderly care center is now open and accepting residents.',
      content: 'After months of construction, our state-of-the-art elderly care center...',
      imageUrl: '/images/news/elderly-center.jpg',
      type: 'news',
      status: 'published',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      title: 'Volunteer Training Workshop',
      slug: 'volunteer-training-workshop',
      summary: 'A comprehensive training program for our dedicated volunteers.',
      content: 'This workshop will cover essential skills for volunteering...',
      imageUrl: '/images/news/volunteer-training.jpg',
      type: 'event',
      eventDate: new Date('2024-03-20'),
      status: 'published',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
  ];

  private generateId(): string {
    return (this.newsEvents.length + 1).toString();
  }

  private generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  findAll(type?: string, status?: string): NewsEvent[] {
    let results = this.newsEvents;
    if (type) {
      results = results.filter((n) => n.type === type);
    }
    if (status) {
      results = results.filter((n) => n.status === status);
    }
    return results;
  }

  findOne(id: string): NewsEvent {
    const item = this.newsEvents.find((n) => n.id === id);
    if (!item) {
      throw new NotFoundException(`News/Event with ID ${id} not found`);
    }
    return item;
  }

  findBySlug(slug: string): NewsEvent {
    const item = this.newsEvents.find((n) => n.slug === slug);
    if (!item) {
      throw new NotFoundException(`News/Event with slug ${slug} not found`);
    }
    return item;
  }

  create(createDto: CreateNewsEventDto): NewsEvent {
    const newItem: NewsEvent = {
      id: this.generateId(),
      slug: this.generateSlug(createDto.title),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createDto,
    };
    this.newsEvents.push(newItem);
    return newItem;
  }

  update(id: string, updateDto: UpdateNewsEventDto): NewsEvent {
    const index = this.newsEvents.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundException(`News/Event with ID ${id} not found`);
    }
    this.newsEvents[index] = {
      ...this.newsEvents[index],
      ...updateDto,
      updatedAt: new Date(),
    };
    return this.newsEvents[index];
  }

  remove(id: string): void {
    const index = this.newsEvents.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundException(`News/Event with ID ${id} not found`);
    }
    this.newsEvents.splice(index, 1);
  }
}