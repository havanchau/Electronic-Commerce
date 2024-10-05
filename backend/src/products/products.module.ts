import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.schema';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { Feedback } from '../feedbacks/feedbacks.schema';
import { FeedbackService } from '../feedbacks/feedbacks.service';
import { FeedbackController } from '../feedbacks/feedbacks.controller';
import { UserModule } from 'src/users/users.module';
import { User } from 'src/users/users.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Feedback, User]),
    ],
    controllers: [ProductController, FeedbackController],
    providers: [ProductService, FeedbackService],
})
export class ProductModule {}
