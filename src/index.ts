import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import path from 'path';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// asset directory variable
const publicDir: string = path.resolve(__dirname, '../assets/images/');
// HTTP request logger middleware
app.use(morgan('combined'));
app.use('/api', express.json(), express.static(publicDir), routes);
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
