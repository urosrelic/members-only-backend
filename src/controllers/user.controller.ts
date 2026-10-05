import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { CreateUserRequestBody } from '../types/user.types';

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
  try {
    const userIdInt = parseInt(req.params.id);

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
  req: Request<CreateUserRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const data = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
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
