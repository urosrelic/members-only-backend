import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { CreateUserRequest } from '../types/user.types';
import * as bcrypt from 'bcrypt';

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
    const userIdInt = parseInt(id);

    if (!userIdInt) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({ where: { id: userIdInt } });

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

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
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
