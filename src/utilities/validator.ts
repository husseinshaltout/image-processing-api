import express from 'express';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
//joining path of directory
const fullImagesDir: string = path.resolve(__dirname, '../../assets/images/full');
// const isCached = (filePath: string): boolean => {
//     if (!existsSync(filePath)) {
//     }
// };
const dirExist = (dirPath: string): string => {
    // refrence: https://github.com/omargaber/ndjs-examples/blob/1ce0fee62d184fb88c7e5a990089c16245839d76/april_22/w3/src/utils/utils.ts#L20
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath);
        console.log('Directory Created.');
    } else {
        console.log('Directory Exists');
    }
    return dirPath;
};
const paramValidator = (request: express.Request): [boolean, string] => {
    try {
        const fullImagePath: string = `${fullImagesDir}/${request.query.filename}.jpg` as string;
        if (!request.query.filename && !request.query.width && !request.query.height) {
            return [true, 'INDEX'];
        } else if (!request.query.width) {
            return [false, 'width is missing'];
        } else if (!request.query.height) {
            return [false, 'height is missing'];
        } else if (!request.query.filename) {
            return [false, 'image file is missing'];
        } else if (
            isNaN(parseFloat(request.query.height as string)) &&
            isNaN(parseInt(request.query.height as string) - 0)
        ) {
            return [false, 'height is NaN'];
        } else if (
            isNaN(parseFloat(request.query.width as string)) &&
            isNaN(parseInt(request.query.width as string) - 0)
        ) {
            return [false, 'width is NaN'];
        } else if (!existsSync(fullImagePath)) {
            return [false, 'image file is missing does not exist'];
        } else {
            return [true, `${request.query.filename}${request.query.width}${request.query.height}`];
        }
    } catch (err) {
        return [false, 'Error Occurred'];
    }
};
export { paramValidator, dirExist };
