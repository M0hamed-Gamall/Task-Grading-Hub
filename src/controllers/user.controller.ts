import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import userService from "../services/user.service.js"

const getMe = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUser(req.user!.id);
  res.status(200).json(user)
});

const getUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUser(req.params.id as string)
  res.status(200).json(user)
})

export default {getMe, getUser}
