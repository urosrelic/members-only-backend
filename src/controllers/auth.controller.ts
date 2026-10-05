import { Request, Response, NextFunction } from 'express';
import { UserLoginBody } from '../types/user.types';
import { prisma } from '../../lib/prisma';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(
  req: Request<UserLoginBody>,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

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
