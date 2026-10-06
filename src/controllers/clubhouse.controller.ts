import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

async function createClubhouse(
  req: Request<{}, {}, { name: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!;

    const { name } = req.body;

    if (!name || name.length > 255) {
      return res.status(422).json({
        error: 'Clubhouse name must be between 1 and 255 characters',
      });
    }

    const newClubhouse = await prisma.clubhouse.create({
      data: {
        name: name,
        owner_id: user.id,
      },
    });

    res.status(200).json({
      message: 'Clubhouse created successfully',
      clubhouse: newClubhouse,
    });

    next();
  } catch (error) {
    next(error);
  }
}

export { createClubhouse };
