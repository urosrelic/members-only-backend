import { Request, Response, NextFunction } from 'express';
import { UserLoginRequest } from '../types/user.types';
import { prisma } from '../config/prisma';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(
  req: Request<UserLoginRequest>,
  res: Response,
  next: NextFunction,
) {
  const data: UserLoginRequest = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    4;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const payload = { id: user.id, email: user.email };
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    next(err);
  }
}

export { login };
