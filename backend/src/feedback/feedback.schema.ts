import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.schema';
import { Product } from '../product/product.schema';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number; // Rating from 1 to 5

  @Column({ length: 500 })
  comment: string;

  @ManyToOne(() => Product, (product) => product.feedbacks, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => User, (user) => user.feedbacks, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
