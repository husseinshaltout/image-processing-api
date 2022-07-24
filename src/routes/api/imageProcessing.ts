import express from 'express';
import { paramValidator, dirExist, isCached } from '../../utilities/validator';
import imageResize from '../../utilities/imageResize';
import path from 'path';

const imageProcessing = express.Router();

imageProcessing.get('/', (req: express.Request, res: express.Response): void => {
    const validatedData = paramValidator(req);

    const resizeImage = async (): Promise<void> => {
        try {
            if (validatedData[0]) {
                // condition when request is valid and has parameters
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
                    const thumbImagePath = `${thumbImagesDir}/${fileName}_${imgWidth}_${imgHeight}.jpg`;
                    if (isCached(thumbImagePath)) {
                        res.write('<html>');
                        res.write('<body>');
                        res.write(`<img src="thumb/${fileName}_${imgWidth}_${imgHeight}.jpg">`);
                        res.write('</body>');
                        res.write('</html>');
                        res.end();
                    } else {
                        dirExist(thumbImagesDir);
                        await imageResize(fullImagePath, imgWidth, imgHeight, thumbImagePath);
                        res.write('<html>');
                        res.write('<body>');
                        res.write(`<img src="thumb/${fileName}_${imgWidth}_${imgHeight}.jpg">`);
                        res.write('</body>');
                        res.write('</html>');
                        res.end();
                    }
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
