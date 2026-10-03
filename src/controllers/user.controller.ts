import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma";

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export { getAllUsers };
