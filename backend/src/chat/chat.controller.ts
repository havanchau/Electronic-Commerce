import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Req,
  } from '@nestjs/common';
  import { ChatService } from './chat.service';
  import { Message } from './message.entity';
  import { CreateMessageDto } from './dto/create-message.dto';
  import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('chat')
  @Controller('chat')
  export class ChatController {
    constructor(private readonly chatService: ChatService) {}
  
    @Post('send')
    @ApiOperation({ summary: 'Send a message' })
    @ApiResponse({ status: 201, description: 'The message has been sent.', type: Message })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async sendMessage(
      @Body() createMessageDto: CreateMessageDto,
      @Req() req: any,
    ): Promise<Message> {
      const senderId = req.user.userId;
      const { recipientId, message } = createMessageDto;
  
      return this.chatService.saveMessage(senderId, recipientId, message);
    }
  
    @Get(':userId/messages')
    @ApiOperation({ summary: 'Get messages for a user' })
    @ApiResponse({ status: 200, description: 'Messages retrieved successfully.', type: [Message] })
    @ApiResponse({ status: 404, description: 'No messages found.' })
    async getMessages(@Param('userId') userId: string): Promise<Message[]> {
      return this.chatService.getMessages(userId);
    }
  }
  