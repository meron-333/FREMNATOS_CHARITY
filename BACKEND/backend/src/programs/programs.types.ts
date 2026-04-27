export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullContent: string;
  imageUrl: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProgramDto {
  title: string;
  description: string;
  fullContent: string;
  imageUrl: string;
  category: string;
  status?: 'active' | 'inactive';
}

export interface UpdateProgramDto {
  title?: string;
  description?: string;
  fullContent?: string;
  imageUrl?: string;
  category?: string;
  status?: 'active' | 'inactive';
}