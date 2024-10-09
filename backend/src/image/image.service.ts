// image.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.schema';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const image = this.imageRepository.create(createImageDto);
    return this.imageRepository.save(image);
  }

  async find(productId: number): Promise<Image[]> {
    return this.imageRepository.find({ where: { product: { id: productId }, isDel: false } });
  }

  async delete(id: number): Promise<void> {
    await this.imageRepository.update(id, { isDel: true });
  }
}
