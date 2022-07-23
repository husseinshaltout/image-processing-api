import express from 'express';
// import getMetadata from '../../utilities/metadata';
import { paramValidator, dirExist } from '../../utilities/validator';
import imageResize from '../../utilities/imageResize';
import path from 'path';

const imageProcessing = express.Router();

imageProcessing.get('/', (req, res) => {
    const validatedData = paramValidator(req);

    const resizeImage = async () => {
        try {
            if (validatedData[0]) {
                if (validatedData[1] != 'INDEX') {
                    const fileName: string = req.query.filename as string;
                    const imgWidth: number = parseInt(req.query.width as string);
                    const imgHeight: number = parseInt(req.query.height as string);
                    const fullImagesDir: string = path.resolve(
                        __dirname,
                        '../../../assets/images/full'
                    );
                    // TODO Change .jpg extension to be specificed by user
                    const fullImagePath = `${fullImagesDir}/${fileName}.jpg`;
                    const thumbImagesDir: string = path.resolve(
                        __dirname,
                        '../../../assets/images/thumb/'
                    );
                    dirExist(thumbImagesDir);
                    const thumbImagePath = `${thumbImagesDir}/${fileName}_${imgWidth}_${imgHeight}.jpg`;
                    await imageResize(fullImagePath, imgWidth, imgHeight, thumbImagePath);
                    res.json({
                        message: `image path:${fullImagePath}, width: ${imgWidth}, height: ${imgHeight}`
                    });
                } else {
                    res.send('Add image, width and height parameters to url');
                }
            } else {
                res.send(validatedData[1]);
            }
        } catch (err) {
            console.log(err);
        }
    };
    resizeImage();
});

export default imageProcessing;
