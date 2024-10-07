import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user', example: 'strongpassword' })
  @IsNotEmpty()
  password: string;
}
