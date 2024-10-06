import { Controller, Get, Post, Body, Param, Delete, Put, Req, UnauthorizedException } from '@nestjs/common';
import { CartService } from './carts.service';
import { CreateCartDto } from './dto/create-carts.dto';
import { UpdateCartDto } from './dto/update-carts.dto';
import { CART_EXCEPTION } from '../../exceptions/index';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any) {
    const userId = req.user.userId;
    const cart = await this.cartService.findCartByUser(userId);

    if (!cart) {
      throw CART_EXCEPTION.NOT_FOUND();
    }

    return cart;
  }

  @Post()
  async createCart(@Body() createCartDto: CreateCartDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.create(createCartDto, userId);
  }

  @Put(':id')
  async updateCart(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.update(id, updateCartDto, userId);
  }

  @Delete(':id')
  async removeCart(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.remove(id, userId);
  }
}
