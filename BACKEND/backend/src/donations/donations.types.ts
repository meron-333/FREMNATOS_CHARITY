export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  projectId?: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  message?: string;
  createdAt: Date;
}

export interface CreateDonationDto {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency?: string;
  projectId?: string;
  paymentMethod: string;
  message?: string;
}

export interface UpdateDonationDto {
  status?: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
}