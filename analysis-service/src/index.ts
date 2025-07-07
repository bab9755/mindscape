    // src/server.ts
    import express, { Request, Response } from 'express';

    const app = express();
    const port = process.env.PORT || 3001;

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from TypeScript server!');
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });