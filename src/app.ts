import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import passport from 'passport';
import { globalErrorHandler } from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';
import clubhouseRoutes from './routes/clubhouse.routes';
import dotenv from 'dotenv';

import configurePassport from './config/passport';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

configurePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get('/health-check', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK!' });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);
app.use('/clubhouse', clubhouseRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
