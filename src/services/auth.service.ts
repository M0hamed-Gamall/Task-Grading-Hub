import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';


const register = async (req: Request) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new AppError("Email already exists", 409, "conflict");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({name, email, password: hashedPassword});

  const accessToken = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET as string, { expiresIn: '10m' });
  const refreshToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}


export default { register };