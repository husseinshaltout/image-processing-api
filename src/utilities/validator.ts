import express from 'express';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
//joining path of directory
const fullImagesDir: string = path.resolve(__dirname, '../../assets/images/full');

const isCached = (filePath: string): boolean => {
    /**
     * checks if file already exist
     * @param {string} filePath
     * @returns {boolean} true if file exist false otherwise
     */
    if (existsSync(filePath)) {
        return true;
    } else {
        return false;
    }
};
const dirExist = (dirPath: string): string => {
    /**
     * creates new directory if it does not exist
     * @param {string} dirPath
     */
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
    /**
     * validates request
     * @param {express.Request} request
     * @param {number} b
     * @returns {[boolean, string]} false if invalid request and string: showing error message
     */
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
            return [false, 'image file does not exist'];
        } else {
            return [true, `${request.query.filename}${request.query.width}${request.query.height}`];
        }
    } catch (err) {
        return [false, 'Error Occurred'];
    }
};
export { paramValidator, dirExist, isCached };
