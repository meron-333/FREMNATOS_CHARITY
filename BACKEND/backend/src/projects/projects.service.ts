import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, CreateProjectDto, UpdateProjectDto } from './projects.types';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: '1',
      title: 'New Building Construction',
      slug: 'new-building',
      description: 'Building a new facility to expand our capacity for care services.',
      targetAmount: 500000,
      raisedAmount: 125000,
      imageUrl: '/images/projects/building.jpg',
      status: 'active',
      category: 'Infrastructure',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Children Education Program',
      slug: 'children-education',
      description: 'Providing quality education and learning materials for orphaned children.',
      targetAmount: 75000,
      raisedAmount: 45000,
      imageUrl: '/images/projects/education.jpg',
      status: 'active',
      category: 'Education',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      title: 'Elderly Care Center',
      slug: 'elderly-care',
      description: 'Establishing a dedicated center for elderly care and support services.',
      targetAmount: 150000,
      raisedAmount: 150000,
      imageUrl: '/images/projects/elderly.jpg',
      status: 'completed',
      category: 'Healthcare',
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2024-03-01'),
    },
  ];

  private generateId(): string {
    return (this.projects.length + 1).toString();
  }

  private generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  findAll(): Project[] {
    return this.projects;
  }

  findOne(id: string): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  findBySlug(slug: string): Project {
    const project = this.projects.find((p) => p.slug === slug);
    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`);
    }
    return project;
  }

  create(createProjectDto: CreateProjectDto): Project {
    const newProject: Project = {
      id: this.generateId(),
      slug: this.generateSlug(createProjectDto.title),
      raisedAmount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createProjectDto,
    };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: string, updateProjectDto: UpdateProjectDto): Project {
    const projectIndex = this.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects[projectIndex] = {
      ...this.projects[projectIndex],
      ...updateProjectDto,
      updatedAt: new Date(),
    };
    return this.projects[projectIndex];
  }

  remove(id: string): void {
    const projectIndex = this.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects.splice(projectIndex, 1);
  }
}