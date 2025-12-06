import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';

/**
 * 
 * @param name - The name of the user
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns The access token and refresh token
 */
const register = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new AppError("Email already exists", 409, "conflict");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({name, email, password: hashedPassword});

  const accessToken = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role }, '10m');
  const refreshToken = generateToken({ id: newUser._id }, '7d');
  return { accessToken, refreshToken };
}

/**
 * 
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns The access token and refresh token
 */
const login = async (email: string, password: string) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new AppError("Invalid email or password", 401, "unauthorized");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401, "unauthorized");
  }
  const accessToken = generateToken({ id: user._id, email: user.email, role: user.role }, '10m');
  const refreshToken = generateToken({ id: user._id }, '7d');
  return { accessToken, refreshToken };
}

/**
 * 
 * @param payload - The payload of the token
 * @param expiresIn - The expiration time of the token
 * @returns The token
 */
const generateToken = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: expiresIn as any });
}

export default { register, login };