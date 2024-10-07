import { Controller, Get, Post, Body, Param, Delete, Put, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CartService } from './carts.service';
import { CreateCartDto } from './dto/create-carts.dto';
import { UpdateCartDto } from './dto/update-carts.dto';
import { CART_EXCEPTION } from '../../exceptions/index';
import { Cart } from './carts.schema';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get the user cart', type: Cart }) // Thay thế Cart bằng kiểu trả về tương ứng
  async getCart(@Req() req: any) {
    const userId = req.user.userId;
    const cart = await this.cartService.findCartByUser(userId);

    if (!cart) {
      throw CART_EXCEPTION.NOT_FOUND();
    }

    return cart;
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new cart', type: Cart })
  async createCart(@Body() createCartDto: CreateCartDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.create(createCartDto, userId);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update an existing cart', type: Cart })
  async updateCart(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.update(id, updateCartDto, userId);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Remove an existing cart' })
  async removeCart(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.remove(id, userId);
  }
}
