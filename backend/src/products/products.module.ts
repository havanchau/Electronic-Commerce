import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.schema';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { Feedback } from '../feedbacks/feedbacks.schema';
import { FeedbackService } from '../feedbacks/feedbacks.service';
import { FeedbackController } from '../feedbacks/feedbacks.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Feedback])],
    controllers: [ProductController, FeedbackController],
    providers: [ProductService, FeedbackService],
})
export class ProductModule {}
