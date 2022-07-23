import express from 'express';
import imageProcessing from './api/imageProcessing';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Main api route!');
});

routes.use('/images', imageProcessing);

export default routes;
