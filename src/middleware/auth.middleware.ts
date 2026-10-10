import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: Express.User | undefined, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: 'Unauthenticated.',
        });
      }

      req.user = user;
      next();
    },
  )(req, res, next);
}

export function authorize(roleName: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user!;

    const hasRole = user.user_roles.some(
      (userRole) => userRole.role.name === roleName,
    );

    if (!hasRole) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    next();
  };
}
