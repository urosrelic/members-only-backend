import express, { Application, Request, Response } from 'express';
import 'dotenv/config';

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK!' });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
