import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.schema';
import { Product } from 'src/product/product.schema';
import { User } from 'src/user/user.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback, Product, User]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
