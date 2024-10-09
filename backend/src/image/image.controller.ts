import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './image.schema';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new image' })
  @ApiResponse({ status: 201, description: 'The image has been successfully created.', type: Image })
  async create(@Body() createImageDto: CreateImageDto): Promise<Image> {
    return this.imageService.create(createImageDto);
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get all images for a product' })
  @ApiResponse({ status: 200, description: 'List of images for the specified product', type: [Image] })
  async findByProductId(@Param('id') id: number): Promise<Image[]> {
    return this.imageService.find(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an image by its ID' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.imageService.delete(id);
  }
}
