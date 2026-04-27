import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NewsEventsService } from './news-events.service';
import type { CreateNewsEventDto, UpdateNewsEventDto } from './news-events.types';

@Controller('news-events')
export class NewsEventsController {
  constructor(private readonly newsEventsService: NewsEventsService) {}

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    return this.newsEventsService.findAll(type, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsEventsService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.newsEventsService.findBySlug(slug);
  }

  @Post()
  create(@Body() createDto: CreateNewsEventDto) {
    return this.newsEventsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateNewsEventDto) {
    return this.newsEventsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsEventsService.remove(id);
  }
}