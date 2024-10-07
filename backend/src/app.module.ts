import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import * as dotenv from 'dotenv';
import { FeedbackModule } from './feedback/feedback.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.schema{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    FeedbackModule,
    ChatModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes('*');
  }
}
