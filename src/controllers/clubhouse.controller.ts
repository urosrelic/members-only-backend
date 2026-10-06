import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';

async function getAllClubhouses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const searchQuery = req.query.search;

    if (searchQuery) {
      const clubhouseQueryResult = await prisma.clubhouse.findMany({
        where: {
          name: {
            contains: searchQuery as string,
            mode: 'insensitive',
          },
        },
      });

      return res.status(200).json(clubhouseQueryResult);
    }

    const clubhouses = await prisma.clubhouse.findMany();

    res.status(200).json(clubhouses);
  } catch (error) {
    next(error);
  }
}

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

export { createClubhouse, getAllClubhouses };
