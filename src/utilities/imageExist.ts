import path from 'path';
import { existsSync, mkdirSync } from 'fs';
const fullImagesDir = path.resolve(__dirname, '../../assets/images/full');

if (existsSync(fullImagesDir)) {
    console.log(fullImagesDir);
    // console.log(`${fullImagesDir}/fjord.jpg`);
} else {
    console.log(fullImagesDir);
    console.log('Directory does not exist');
}
