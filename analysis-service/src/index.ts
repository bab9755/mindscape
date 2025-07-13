import express, { Request, Response } from 'express';
import analysisRouter from './routes/analysis-agent';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript server!');
});

app.use(express.json());
app.use('/analyser-agent', analysisRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});