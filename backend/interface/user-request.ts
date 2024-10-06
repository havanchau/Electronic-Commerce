import { Request } from 'express';

export interface User {
  userId: number; 
  username: string;
}

export interface UserRequest extends Request {
  user: User;
}
