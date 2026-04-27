export interface NewsEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  type: 'news' | 'event';
  eventDate?: Date;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNewsEventDto {
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  type: 'news' | 'event';
  eventDate?: Date;
  status: 'published' | 'draft' | 'archived';
}

export interface UpdateNewsEventDto {
  title?: string;
  summary?: string;
  content?: string;
  imageUrl?: string;
  type?: 'news' | 'event';
  eventDate?: Date;
  status?: 'published' | 'draft' | 'archived';
}