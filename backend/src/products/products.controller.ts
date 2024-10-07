import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from './products.service';
import { Product } from './products.schema';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  // Get all products
  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Advanced search for products
  @Get('search')
  @ApiOperation({ summary: 'Search products based on query' })
  @ApiResponse({ status: 200, description: 'List of products matching the search', type: [Product] })
  async findProductsAdvanced(@Query() query: Record<string, any>): Promise<Product[]> {
    return this.productService.findProductsAdvanced(query);
  }

  // Get a product by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'The product with the given ID', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Update a product by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: 'number' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'The product has been updated', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  // Soft delete a product by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product by its ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: 'number' })
  @ApiResponse({ status: 204, description: 'The product has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
