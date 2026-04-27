export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  imageUrl: string;
  status: 'active' | 'completed' | 'paused';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  targetAmount: number;
  imageUrl: string;
  status: 'active' | 'completed' | 'paused';
  category: string;
}

export interface UpdateProjectDto {
  title?: string;
  description?: string;
  targetAmount?: number;
  raisedAmount?: number;
  imageUrl?: string;
  status?: 'active' | 'completed' | 'paused';
  category?: string;
}