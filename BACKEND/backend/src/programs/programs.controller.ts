import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import type { CreateProgramDto, UpdateProgramDto } from './programs.types';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('status') status?: string,
  ) {
    return this.programsService.findAll(category, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.programsService.findBySlug(slug);
  }

  @Post()
  create(@Body() createDto: CreateProgramDto) {
    return this.programsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProgramDto) {
    return this.programsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}