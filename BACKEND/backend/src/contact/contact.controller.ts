import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './contact.types';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() body: CreateContactSubmissionDto) {
    const requiredFields: Array<keyof CreateContactSubmissionDto> = [
      'fullName',
      'phoneNumber',
      'email',
      'involvedMethod',
      'volunteerRole',
      'subject',
    ];

    for (const field of requiredFields) {
      if (!body?.[field] || String(body[field]).trim().length === 0) {
        throw new BadRequestException(`Missing required field: ${field}`);
      }
    }

    return this.contactService.create(body);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }
}
