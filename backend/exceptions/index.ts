import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export const USER_EXCEPTION = {
  NOT_FOUND: () => new NotFoundException('User not found.'),
  UNAUTHORIZED: () => new UnauthorizedException('You are not authorized to perform this action.'),
  BAD_REQUEST: () => new BadRequestException('Invalid user data.'),
};

export const CART_EXCEPTION = {
  NOT_FOUND: () => new NotFoundException('Cart not found.'),
  UNAUTHORIZED: () => new UnauthorizedException('You do not have permission to access this cart.'),
  EMPTY_CART: () => new BadRequestException('Your cart is empty.'),
};

export const PRODUCT_EXCEPTION = {
  NOT_FOUND: () => new NotFoundException('Product not found.'),
  OUT_OF_STOCK: () => new BadRequestException('Product is out of stock.'),
};

export const FEEDBACK_EXCEPTION = {
  NOT_FOUND: () => new NotFoundException('Feedback not found.'),
  INVALID_RATING: () => new BadRequestException('Invalid rating value.'),
};
