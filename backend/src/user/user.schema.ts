import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Feedback } from '../feedback/feedback.schema';
import { UserRole } from 'enum/role';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 100 })
  name: string

  @Column({ length: 10, unique: true })
  phone: string

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ default: false })
  isDel: boolean;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Feedback, (feedback) => feedback.product)
  feedbacks: Feedback[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
}
