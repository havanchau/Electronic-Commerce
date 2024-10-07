import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Product } from '../product/product.schema';
import { User } from '../user/user.schema';
import { FEEDBACK_EXCEPTION } from '../../exceptions/index';

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
      throw FEEDBACK_EXCEPTION.NOT_FOUND();
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
