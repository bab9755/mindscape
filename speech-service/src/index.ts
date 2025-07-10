import express, { Request, Response } from 'express';
import speechRouter from './routes/speech';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/speech', speechRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the speech to text server!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});