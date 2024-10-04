import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.schema';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  // Get all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Get a product by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Update a product by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  // Soft delete a product by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
