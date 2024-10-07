import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Updated name of the product',
    example: 'Eco-friendly Shampoo',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated price of the product',
    example: 25.99,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Updated description of the product',
    example: 'A biodegradable, eco-friendly shampoo with enhanced formula.',
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiPropertyOptional({
    description: 'Updated category of the product',
    example: 'Hair Care',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'Updated stock of the product',
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({
    description: 'Updated brand of the product',
    example: 'EcoBrand',
  })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Updated benefit of the product',
    example: 'Adds more shine and strength to hair.',
  })
  @IsString()
  @IsOptional()
  benefit?: string;

  @ApiPropertyOptional({
    description: 'Updated capacity of the product',
    example: '700ml',
  })
  @IsString()
  @IsOptional()
  capacity?: string;

  @ApiPropertyOptional({
    description: 'Updated rating of the product',
    example: 4.8,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;
}
