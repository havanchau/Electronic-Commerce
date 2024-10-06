import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Product } from './products.schema';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { PRODUCT_EXCEPTION } from '../../exceptions/index';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.update(id, { isDel: true });
  }

  async findProductsAdvanced(query: Record<string, any>): Promise<Product[]> {
    const where: any = {};

    if (query.name) {
      where.name = Like(`%${query.name}%`);
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.minPrice || query.maxPrice) {
      where.price = Between(query.minPrice || 0, query.maxPrice || Number.MAX_SAFE_INTEGER);
    }

    if (query.brand) {
      where.brand = query.brand;
    }

    if (query.capacity) {
      where.capacity = query.capacity;
    }

    if (query.rating) {
      where.rating = query.rating;
    }

    if (query.benefit) {
      where.benefit = query.benefit;
    }

    const options: any = {
      where,
      order: query.sortBy && query.order ? { [query.sortBy]: query.order.toUpperCase() } : {},
      take: query.limit ? parseInt(query.limit) : undefined,
    };

    return await this.productRepository.find(options);
  }
  
}
