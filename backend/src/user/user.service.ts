import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { USER_EXCEPTION } from '../../exceptions/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { isDel: false } });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id, isDel: false } });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email, isDel: false } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, isDel: false } });
    if (!user) throw USER_EXCEPTION.NOT_FOUND();

    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.update(id, { isDel: true });
  }
}
