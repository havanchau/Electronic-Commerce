import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './feedback.schema';
import { User } from '../user/user.schema';
import { CurrentUser } from '../auth/current-user.decorator';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Create feedback (only accessible after login)
  @Post()
  @ApiOperation({ summary: 'Create feedback for a product' })
  @ApiBody({ type: CreateFeedbackDto })
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @CurrentUser() user: User,
  ): Promise<Feedback> {
    return this.feedbackService.create(createFeedbackDto, user.id);
  }

  // Get all feedback for a product
  @Public()
  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all feedback for a specific product' })
  @ApiParam({
    name: 'productId',
    description: 'ID of the product',
    example: 1,
  })
  async findByProduct(@Param('productId') productId: number): Promise<Feedback[]> {
    return this.feedbackService.findByProduct(productId);
  }
}
