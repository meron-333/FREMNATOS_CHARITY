import { Injectable, NotFoundException } from '@nestjs/common';
import { Program, CreateProgramDto, UpdateProgramDto } from './programs.types';

@Injectable()
export class ProgramsService {
  private programs: Program[] = [
    {
      id: '1',
      title: "Children's Care Program",
      slug: 'children-care',
      description: 'Comprehensive care for orphaned and vulnerable children.',
      fullContent: 'Our children care program provides shelter, education, healthcare, and emotional support...',
      imageUrl: '/images/programs/children.jpg',
      category: 'Children',
      status: 'active',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      title: 'Elderly Care Program',
      slug: 'elderly-care',
      description: 'Dedicated support and care for elderly members of our community.',
      fullContent: 'The elderly care program offers medical assistance, daily living support, and social activities...',
      imageUrl: '/images/programs/elderly.jpg',
      category: 'Elderly',
      status: 'active',
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-02-01'),
    },
    {
      id: '3',
      title: 'Mental Health Support',
      slug: 'mental-health',
      description: 'Professional mental health services and addiction recovery support.',
      fullContent: 'Our mental health program provides counseling, therapy, and rehabilitation services...',
      imageUrl: '/images/programs/mental-health.jpg',
      category: 'Healthcare',
      status: 'active',
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-03-01'),
    },
  ];

  private generateId(): string {
    return (this.programs.length + 1).toString();
  }

  private generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  findAll(category?: string, status?: string): Program[] {
    let results = this.programs;
    if (category) {
      results = results.filter((p) => p.category === category);
    }
    if (status) {
      results = results.filter((p) => p.status === status);
    }
    return results;
  }

  findOne(id: string): Program {
    const program = this.programs.find((p) => p.id === id);
    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    return program;
  }

  findBySlug(slug: string): Program {
    const program = this.programs.find((p) => p.slug === slug);
    if (!program) {
      throw new NotFoundException(`Program with slug ${slug} not found`);
    }
    return program;
  }

  create(createDto: CreateProgramDto): Program {
    const newProgram: Program = {
      id: this.generateId(),
      slug: this.generateSlug(createDto.title),
      status: createDto.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createDto,
    };
    this.programs.push(newProgram);
    return newProgram;
  }

  update(id: string, updateDto: UpdateProgramDto): Program {
    const index = this.programs.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    this.programs[index] = {
      ...this.programs[index],
      ...updateDto,
      updatedAt: new Date(),
    };
    return this.programs[index];
  }

  remove(id: string): void {
    const index = this.programs.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    this.programs.splice(index, 1);
  }
}