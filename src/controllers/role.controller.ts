import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../lib/prisma';

async function getAllRoles(req: Request, res: Response, next: NextFunction) {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json({ roles });
  } catch (error) {
    next(error);
  }
}

async function createRole(
  req: Request<{}, {}, { name: string }>,
  res: Response,
  next: NextFunction,
) {
  const data = req.body;

  const existingRole = await prisma.role.findUnique({
    where: { name: data.name },
  });

  if (existingRole) {
    return res.status(409).json({ message: 'Role name already exists' });
  }

  const newRole = await prisma.role.create({
    data: {
      name: data.name,
    },
  });

  res.status(200).json({ message: 'Role created successfully', role: newRole });
  try {
  } catch (error) {
    next(error);
  }
}

export { getAllRoles, createRole };
