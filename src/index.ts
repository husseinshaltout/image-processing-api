import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use('/api', express.json(), routes);

// add routing for / path
app.get('/', (req: Request, res: Response) => {
    res.send('Home');
});

// start express server
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is starting at http://localhost:${PORT}`);
});

export default app;
