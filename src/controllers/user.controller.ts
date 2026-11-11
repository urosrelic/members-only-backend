import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { CreateUserRequest } from '../types/user.types';
import * as bcrypt from 'bcrypt';
import { AppError } from '../errors/AppError';

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, email: true, first_name: true, last_name: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(
  req: Request<{}, {}, CreateUserRequest>,
  res: Response,
  next: NextFunction,
) {
  const data = req.body;

  if (!data.username || data.username.length > 255) {
    throw new AppError('Username is required (max 255 characters)', 400);
  }

  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const existingUsername = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingEmail || existingUsername) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        profile_picture: data.profile_picture,

        user_roles: {
          create: {
            role: {
              connect: {
                name: 'USER',
              },
            },
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    next(err);
  }
}

export { getAllUsers, getUserById, createUser };
