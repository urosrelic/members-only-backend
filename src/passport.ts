import dotenv from 'dotenv';

import { prisma } from '../lib/prisma';

import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
  StrategyOptions,
} from 'passport-jwt';
import { PassportStatic } from 'passport';

dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'fallback_secret_if_missing',
};

interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

module.exports = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      opts,
      async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
        try {
          const user = await prisma.user.findFirst({
            where: { id: jwt_payload.id },
          });
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (err) {
          console.error(err);
          return done(err, false);
        }
      },
    ),
  );
};
