import { Injectable, NotFoundException } from '@nestjs/common';
import { Donation, CreateDonationDto, UpdateDonationDto } from './donations.types';

@Injectable()
export class DonationsService {
  private donations: Donation[] = [
    {
      id: '1',
      donorName: 'John Smith',
      donorEmail: 'john@example.com',
      amount: 500,
      currency: 'USD',
      projectId: '1',
      paymentMethod: 'credit_card',
      status: 'completed',
      transactionId: 'txn_123456',
      message: 'Happy to support this cause!',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '2',
      donorName: 'Sarah Johnson',
      donorEmail: 'sarah@example.com',
      amount: 250,
      currency: 'USD',
      projectId: '2',
      paymentMethod: 'paypal',
      status: 'completed',
      transactionId: 'txn_789012',
      createdAt: new Date('2024-02-05'),
    },
  ];

  private generateId(): string {
    return (this.donations.length + 1).toString();
  }

  private generateTransactionId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  findAll(projectId?: string, status?: string): Donation[] {
    let results = this.donations;
    if (projectId) {
      results = results.filter((d) => d.projectId === projectId);
    }
    if (status) {
      results = results.filter((d) => d.status === status);
    }
    return results;
  }

  findOne(id: string): Donation {
    const donation = this.donations.find((d) => d.id === id);
    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }
    return donation;
  }

  create(createDto: CreateDonationDto): Donation {
    const newDonation: Donation = {
      id: this.generateId(),
      transactionId: this.generateTransactionId(),
      currency: createDto.currency || 'USD',
      status: 'pending',
      createdAt: new Date(),
      ...createDto,
    };
    this.donations.push(newDonation);
    return newDonation;
  }

  update(id: string, updateDto: UpdateDonationDto): Donation {
    const index = this.donations.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }
    this.donations[index] = {
      ...this.donations[index],
      ...updateDto,
    };
    return this.donations[index];
  }

  getTotalDonations(projectId?: string): number {
    const filtered = projectId
      ? this.donations.filter((d) => d.projectId === projectId && d.status === 'completed')
      : this.donations.filter((d) => d.status === 'completed');
    return filtered.reduce((sum, d) => sum + d.amount, 0);
  }
}