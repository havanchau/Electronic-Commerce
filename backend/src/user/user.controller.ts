import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of users.' })
  async findAll(): Promise<any[]> {
    const users = await this.userService.findAll();
    return users.map(({ name, role, createdAt, updatedAt, email, phone }) => ({ name, role, createdAt, updatedAt, email, phone }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'ID of the user', type: Number })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findById(id);
    const { password, ...userResponse } = user;
    return userResponse;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', description: 'ID of the user', type: Number })
  @ApiResponse({ status: 200, description: 'Successfully updated user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiParam({ name: 'id', description: 'ID of the user', type: Number })
  @ApiResponse({ status: 200, description: 'Successfully deleted user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
