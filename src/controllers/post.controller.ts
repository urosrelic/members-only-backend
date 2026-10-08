import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { CreatePostRequest } from '../types/post.types';

async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const searchQuery = req.query.search;

    if (searchQuery) {
      const postQueryResult = await prisma.post.findMany({
        where: {
          post_text: {
            contains: searchQuery as string,
            mode: 'insensitive',
          },
        },
      });

      return res.status(200).json(postQueryResult);
    }

    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

async function createPost(
  req: Request<{}, {}, CreatePostRequest>,
  res: Response,
  next: NextFunction,
) {
  const user = req.user;

  const { postText, clubhouseId } = req.body;

  if (!postText || !clubhouseId) {
    return res.status(422).json({ error: 'Missing required fields' });
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        post_text: postText,
        user_id: user!.id,
        clubhouse_id: clubhouseId,
      },
    });

    return res.status(201).json(newPost);

  } catch (error) {
    next(error);
  }
}

export { getPosts, createPost };
