import type { Request, Response, NextFunction } from 'express';

export default function asyncWrapper(fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  }
}