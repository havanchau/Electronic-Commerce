import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('API for the e-commerce project')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('api/v1');
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  await app.listen(parseInt(process.env.PORT) ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
