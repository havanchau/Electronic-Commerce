import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Feedback } from '../feedback/feedback.schema';
import { FeedbackService } from '../feedback/feedback.service';
import { FeedbackController } from '../feedback/feedback.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Feedback, User]),
    ],
    controllers: [ProductController, FeedbackController],
    providers: [ProductService, FeedbackService],
})
export class ProductModule {}
