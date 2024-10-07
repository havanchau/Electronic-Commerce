import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'The rating given by the customer, from 1 to 5',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'The feedback comment left by the customer',
    example: 'Great product!',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'The ID of the product being reviewed',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
