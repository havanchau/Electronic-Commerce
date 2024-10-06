import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './carts.schema';
import { CreateCartDto } from './dto/create-carts.dto';
import { UpdateCartDto } from './dto/update-carts.dto';
import { CART_EXCEPTION } from '../../exceptions/index';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async findCartByUser(userId: number): Promise<Cart> {
    return this.cartRepository.findOne({ where: { userId } });
  }

  async create(createCartDto: CreateCartDto, userId: number): Promise<Cart> {
    const cart = this.cartRepository.create({ ...createCartDto, userId });
    return this.cartRepository.save(cart);
  }

  async update(cartId: number, updateCartDto: UpdateCartDto, userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId, userId } });

    if (!cart) {
      throw CART_EXCEPTION.NOT_FOUND();
    }

    Object.assign(cart, updateCartDto);
    return this.cartRepository.save(cart);
  }

  async remove(cartId: number, userId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId, userId } });

    if (!cart) {
      throw CART_EXCEPTION.EMPTY_CART();
    }

    await this.cartRepository.delete(cartId);
  }
}
