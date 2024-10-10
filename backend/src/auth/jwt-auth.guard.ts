import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const token = request.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token is required.');
    }

    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

      if (typeof decoded !== 'string' && decoded.hasOwnProperty('userId')) {
        request.user = {
          userId: (decoded as JwtPayload).userId,
          username: (decoded as JwtPayload).username,
        };
        return true;
      } else {
        throw new UnauthorizedException('Invalid token payload.');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
