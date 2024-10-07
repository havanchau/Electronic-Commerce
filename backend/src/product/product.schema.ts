import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Feedback } from '../feedback/feedback.schema'

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 100 })
  name: string

  @Column()
  price: number

  @Column()
  desc: string

  @Column({ length: 200 })
  category: string;

  @Column()
  stock: number

  @Column({ length: 200 })
  brand: string;

  @Column()
  benefit: string;

  @Column()
  capacity: string;

  @Column()
  rating: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ default: false })
  isDel: boolean;

  @OneToMany(() => Feedback, (feedback) => feedback.product)
  feedbacks: Feedback[];
}
