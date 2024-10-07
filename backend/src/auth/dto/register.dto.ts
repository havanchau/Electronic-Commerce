import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the user', example: '0123456789' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The password of the user (minimum 6 characters)', example: 'strongpassword' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
