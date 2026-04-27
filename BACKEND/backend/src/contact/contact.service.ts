import { Injectable } from '@nestjs/common';
import {
  ContactSubmission,
  CreateContactSubmissionDto,
} from './contact.types';

@Injectable()
export class ContactService {
  private readonly submissions: ContactSubmission[] = [];
  private idCounter = 1;

  create(input: CreateContactSubmissionDto): ContactSubmission {
    const submission: ContactSubmission = {
      id: this.idCounter++,
      fullName: input.fullName.trim(),
      phoneNumber: input.phoneNumber.trim(),
      email: input.email.trim(),
      involvedMethod: input.involvedMethod.trim(),
      volunteerRole: input.volunteerRole.trim(),
      subject: input.subject.trim(),
      createdAt: new Date().toISOString(),
    };

    this.submissions.unshift(submission);
    return submission;
  }

  findAll(): ContactSubmission[] {
    return this.submissions;
  }
}
