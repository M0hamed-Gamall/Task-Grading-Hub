import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import taskService from "../services/task.service.js";

interface User {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

const addTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const {title, description, deadline} = req.body;
  const authenticatedReq = req as AuthenticatedRequest
  const publishedBy = authenticatedReq.user.id
  const task = await taskService.addTask(title, description, deadline, publishedBy);
  res.status(201).json(task)
})

const getTasks = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const tasks = await taskService.getTasks()
  res.status(200).json(tasks)
})

const getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const task = await taskService.getTask(req.params.id as string)
  res.status(200).json(task)
})



export default {addTask, getTasks, getTask}