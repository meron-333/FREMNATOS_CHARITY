export interface ContactSubmission {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  involvedMethod: string;
  volunteerRole: string;
  subject: string;
  createdAt: string;
}

export class CreateContactSubmissionDto {
  fullName!: string;
  phoneNumber!: string;
  email!: string;
  involvedMethod!: string;
  volunteerRole!: string;
  subject!: string;
}
