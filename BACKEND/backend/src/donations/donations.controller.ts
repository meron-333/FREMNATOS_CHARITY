import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DonationsService } from './donations.service';
import type { CreateDonationDto, UpdateDonationDto } from './donations.types';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  findAll(
    @Query('projectId') projectId?: string,
    @Query('status') status?: string,
  ) {
    return this.donationsService.findAll(projectId, status);
  }

  @Get('total')
  getTotalDonations(@Query('projectId') projectId?: string) {
    return { total: this.donationsService.getTotalDonations(projectId) };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateDonationDto) {
    return this.donationsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDonationDto) {
    return this.donationsService.update(id, updateDto);
  }
}