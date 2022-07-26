import express from 'express';
import imageProcessing from './api/imageProcessing';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('Main api route!');
});

routes.use('/images', imageProcessing);

export default routes;
