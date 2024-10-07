import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'The phone number of the user' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Password123', description: 'The password of the user', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
