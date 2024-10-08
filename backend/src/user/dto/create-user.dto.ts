import { IsNotEmpty, IsEmail, MinLength, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Lang } from 'enum/lang';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'The phone number of the user' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Password123', description: 'The password of the user', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'vi', description: 'Language user want to display' })
  @IsString()
  @IsOptional()
  lang?: Lang;
}
