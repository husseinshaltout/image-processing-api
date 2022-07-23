import express from 'express';
import sharp from 'sharp';
import path from 'path';

const getMetadata = async (req: express.Request, res: express.Response, next: Function) => {
    try {
        const inputFile = req.query.filename;
        const imgDir: string = path.resolve(__dirname, '../../images/full/');
        const originalImagePath = `${imgDir}/${inputFile}`;
        console.log(originalImagePath);
        const metadata = await sharp(originalImagePath).metadata();
        console.log(metadata);
        next();
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
};
export default getMetadata;
