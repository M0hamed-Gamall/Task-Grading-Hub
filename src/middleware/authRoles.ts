import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import AppError from '../utils/appError.js';

export const authRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const userRole = decoded.role;
        if (userRole && roles.includes(userRole)) {
          req.user = {
            id: decoded.id as string,
            email: decoded.email as string,
            role: decoded.role as string,
          };
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