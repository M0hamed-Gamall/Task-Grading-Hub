import type { Request, Response } from 'express';
import authService from '../services/auth.service.js';
import asyncWrapper from '../middleware/asyncwrapper.js';

const register = asyncWrapper( async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { accessToken, refreshToken } = await authService.register(name, email, password);
  res.cookie("refreshToken", refreshToken, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     maxAge: 7 * 24 * 60 * 60 * 1000 
    });
  res.status(201).json({accessToken});
})

const login = asyncWrapper( async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await authService.login(email, password);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000 
   });
  res.status(200).json({accessToken});
});

export default { register, login };