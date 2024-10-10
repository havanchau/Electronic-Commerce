import { Test, TestingModule } from '@nestjs/testing';
import { LoggerMiddleware } from './logger.middleware';
import { Reflector } from '@nestjs/core';

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddleware, Reflector],
    }).compile();

    loggerMiddleware = module.get<LoggerMiddleware>(LoggerMiddleware);
  });

  it('should be defined', () => {
    expect(loggerMiddleware).toBeDefined();
  });
});
