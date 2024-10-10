import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Lang } from 'enum/lang';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '1234567890', description: 'The phone number of the user' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'some_refresh_token', description: 'The refresh token of the user' })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiPropertyOptional({ example: 'Password123', description: 'The password of the user', minLength: 6 })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: 'vi', description: 'Language user want to display' })
  @IsString()
  @IsOptional()
  lang?: Lang;

  @ApiPropertyOptional({ example: 'false', description: 'User verified account' })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}
