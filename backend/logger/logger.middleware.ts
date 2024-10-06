import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token is required.');
    }

    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

      if (typeof decoded !== 'string' && decoded.hasOwnProperty('userId')) {
        req.user = {
          userId: (decoded as JwtPayload).userId,
          username: (decoded as JwtPayload).username
        };
      } else {
        throw new UnauthorizedException('Invalid token payload.');
      }

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
