import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Eco-friendly Shampoo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 29.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A biodegradable, eco-friendly shampoo for all hair types.',
  })
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Hair Care',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Number of items in stock',
    example: 50,
  })
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({
    description: 'Brand of the product',
    example: 'EcoBrand',
  })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Benefit of using the product',
    example: 'Improves hair strength and shine.',
  })
  @IsString()
  @IsOptional()
  benefit?: string;

  @ApiPropertyOptional({
    description: 'Capacity of the product',
    example: '500ml',
  })
  @IsString()
  @IsOptional()
  capacity?: string;

  @ApiPropertyOptional({
    description: 'Product rating',
    example: 4.5,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;
}
