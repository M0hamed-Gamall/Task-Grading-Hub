import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

export const authRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const userRole = (decoded as any).role ;
        if (userRole && roles.includes(userRole)) {
          (req as any).user = decoded;
          return next();
        } 
      } catch (err){
        if ((err as any).name === "TokenExpiredError") {
          return next(new AppError("Access token expired", 401, "TokenExpired"));
        }
        return next(new AppError("access denied, invalid token", 401, 'Unauthorized'));
      }
    } else{
      return next(new AppError("access denied, no token provided", 401, 'Unauthorized'));
    } 
    return next(new AppError("you are unauthorized", 401, 'Unauthorized'));
  }
}