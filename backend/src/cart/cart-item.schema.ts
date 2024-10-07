import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.schema';

@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
