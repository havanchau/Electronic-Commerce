import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedbacks.schema';
import { CreateFeedbackDto } from './dto/create-feedbacks.dto';
import { Product } from '../products/products.schema';
import { User } from '../users/users.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create feedback
  async create(createFeedbackDto: CreateFeedbackDto, userId: number): Promise<Feedback> {
    const { rating, comment, productId } = createFeedbackDto;

    const product = await this.productRepository.findOne({ where: { id: productId, isDel: false } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!product) {
      throw new Error('Product not found or deleted');
    }

    const feedback = this.feedbackRepository.create({
      rating,
      comment,
      product,
      user,
    });

    return this.feedbackRepository.save(feedback);
  }

  // Get feedback for a product
  async findByProduct(productId: number): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });
  }
}
