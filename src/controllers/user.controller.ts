import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import userService from "../services/user.service.js"

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

const getMe = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const authenticatedReq = req as AuthenticatedRequest;
  const user = await userService.getUser(authenticatedReq.user.id);
  res.status(200).json(user)
});

const getUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUser(req.params.id as string)
  res.status(200).json(user)
})

export default {getMe, getUser}
