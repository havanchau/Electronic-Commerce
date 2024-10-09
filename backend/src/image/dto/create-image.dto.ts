import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
