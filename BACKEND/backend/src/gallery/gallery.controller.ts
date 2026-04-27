import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import type { CreateGalleryImageDto, UpdateGalleryImageDto } from './gallery.types';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.galleryService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateGalleryImageDto) {
    return this.galleryService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateGalleryImageDto) {
    return this.galleryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}