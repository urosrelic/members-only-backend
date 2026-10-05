import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import { globalErrorHandler } from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK!' });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
