import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackController } from './feedbacks.controller';
import { FeedbackService } from './feedbacks.service';
import { Feedback } from './feedbacks.schema';
import { Product } from 'src/products/products.schema';
import { User } from 'src/users/users.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback, Product, User]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
